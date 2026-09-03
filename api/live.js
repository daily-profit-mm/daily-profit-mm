export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.thaistock2d.com/live");
    const data = await response.json();

    // လိုအပ်ပါက ဤနေရာတွင် modern နှင့် internet တန်ဖိုးများကို 
    // ထည့်သွင်းခြင်း သို့မဟုတ် ဖွဲ့စည်းပုံပြင်ဆင်ခြင်းများ လုပ်ဆောင်နိုင်ပါသည်။
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
