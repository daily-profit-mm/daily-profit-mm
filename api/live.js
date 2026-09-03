export default async function handler(req, res) {
  try {
    const fetchApi = async (url) => {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      return await response.json();
    };

    // လိုအပ်သော API များကို Parallel ဖြင့် ခေါ်ယူခြင်း
    // (Modern/Internet အတွက် သီးသန့် endpoint သို့မဟုတ် live data ထဲမှ အချက်အလက်များကို ပေါင်းစပ်ပေးထားသည်)
    const [liveData, modernData] = await Promise.all([
      fetchApi("https://api.thaistock2d.com/live").catch(() => null),
      fetchApi("https://api.thaistock2d.com/modern").catch(() => null)
    ]);

    const results = liveData?.result || [];
    const modernResults = modernData?.result || [];

    const findResult = (time) => {
      return results.find((item) => item.open_time === time) || null;
    };

    const findModern = (time) => {
      return modernResults.find((item) => item.open_time === time) || null;
    };

    // အချိန်အလိုက် ရှာဖွေခြင်း
    const r0930 = findModern("09:30:00") || findResult("09:30:00");
    const r1100 = findResult("11:00:00");
    const r1201 = findResult("12:01:00");
    const r1400 = findModern("14:00:00") || findResult("14:00:00");
    const r1500 = findResult("15:00:00");
    const r1630 = findResult("16:30:00");

    // CORS Headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).json({
      success: true,

      modern: {
        "09:30": r0930
          ? {
              modern: r0930.modern || r0930.set || null,
              internet: r0930.internet || r0930.value || null,
              twod: r0930.twod || null
            }
          : null,

        "14:00": r1400
          ? {
              modern: r1400.modern || r1400.set || null,
              internet: r1400.internet || r1400.value || null,
              twod: r1400.twod || null
            }
          : null
      },

      results: {
        "11:00": r1100
          ? {
              set: r1100.set,
              value: r1100.value,
              twod: r1100.twod
            }
          : null,

        "12:01": r1201
          ? {
              set: r1201.set,
              value: r1201.value,
              twod: r1201.twod
            }
          : null,

        "15:00": r1500
          ? {
              set: r1500.set,
              value: r1500.value,
              twod: r1500.twod
            }
          : null,

        "16:30": r1630
          ? {
              set: r1630.set,
              value: r1630.value,
              twod: r1630.twod
            }
          : null
      },

      live: liveData?.live || null,

      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("API Error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch 2D data",
      message: error.message
    });
  }
}
