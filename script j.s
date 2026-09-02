// Daily Profit-MM - Live Data Script
async function fetchLiveData() {
    try {
        // သင်၏ API Endpoint ဖြင့် ချိတ်ဆက်ခြင်း
        const response = await fetch('https://daily-profit-mm.vercel.app/api/live');
        const data = await response.json();

        // ၁။ Current Result နံပါတ်ပြရန်
        const resultNumberElem = document.querySelector('.result-number');
        if (resultNumberElem && data.result) {
            resultNumberElem.innerText = data.result; 
        }

        // ၂။ Modern & Internet တန်ဖိုးများပြရန်
        const mod930 = document.getElementById('modern-930');
        if (mod930 && data.modern930) mod930.innerText = data.modern930;

        const int930 = document.getElementById('internet-930');
        if (int930 && data.internet930) int930.innerText = data.internet930;

        const mod200 = document.getElementById('modern-200');
        if (mod200 && data.modern200) mod200.innerText = data.modern200;

        const int200 = document.getElementById('internet-200');
        if (int200 && data.internet200) int200.innerText = data.internet200;

        // ၃။ နောက်ဆုံး update လုပ်ချိန်ပြရန်
        const updateElem = document.querySelector('.update');
        if (updateElem) {
            const now = new Date();
            updateElem.innerText = `Last update: ${now.toLocaleTimeString()}`;
        }

    } catch (error) {
        console.error('API Error:', error);
    }
}

// စတင်အလုပ်လုပ်စေရန် ခေါ်ယူခြင်း
fetchLiveData();

// ၁ မိနစ်တစ်ကြိမ် အလိုအလျောက် ဒေတာဆွဲထုတ်ရန်
setInterval(fetchLiveData, 60000);
