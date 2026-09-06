async function fetchStockData() {
  try {
    const response = await fetch('/api/index'); // ကိုယ့်ရဲ့ API endpoint လိပ်စာထည့်ပါ
    const data = await response.json();

    if (!data.success) return;

    // 1. Current Result & Stats (live data ထဲက ဥပမာ)
    if (data.live) {
      document.getElementById('current-result').innerText = data.live.twod || '--';
      document.getElementById('last-update').innerText = data.live.time || '--:--:--';
      document.getElementById('current-set').innerText = data.live.set || '--';
      document.getElementById('current-val').innerText = data.live.value || '--';
    }

    // 2. နံနက်ပိုင်း (9:30 AM & 12:01 PM)
    if (data.modern["09:30"]) {
      document.getElementById('modern-930').innerText = data.modern["09:30"].modern || '--';
      document.getElementById('internet-930').innerText = data.modern["09:30"].internet || '--';
    }

    if (data.results["12:01"]) {
      document.getElementById('result-1201').innerText = data.results["12:01"].twod || '--';
      document.getElementById('set-1201').innerText = data.results["12:01"].set || '--';
      document.getElementById('val-1201').innerText = data.results["12:01"].value || '--';
    }

    // 3. ညနေပိုင်း (2:00 PM & 4:30 PM)
    if (data.modern["14:00"]) {
      document.getElementById('modern-200').innerText = data.modern["14:00"].modern || '--';
      document.getElementById('internet-200').innerText = data.modern["14:00"].internet || '--';
    }

    if (data.results["16:30"]) {
      document.getElementById('result-1630').innerText = data.results["16:30"].twod || '--';
      document.getElementById('set-1630').innerText = data.results["16:30"].set || '--';
      document.getElementById('val-1630').innerText = data.results["16:30"].value || '--';
    }

    // 4. MM-ထွက်ဂဏန်းများ (11:00 AM & 3:00 PM)
    if (data.results["11:00"]) {
      document.getElementById('session-1100').innerText = data.results["11:00"].twod || '--';
    }
    if (data.results["15:00"]) {
      document.getElementById('session-1500').innerText = data.results["15:00"].twod || '--';
    }

  } catch (error) {
    console.error("Failed to load 2D data:", error);
  }
}

// စတင်ဖွင့်ချိန်နှင့် တချို့အချိန်များတွင် Auto Refresh လုပ်ရန် (ဥပမာ - ၁ မိနစ်တစ်ကြိမ်)
fetchStockData();
setInterval(fetchStockData, 60000);
