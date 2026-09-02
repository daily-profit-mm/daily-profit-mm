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

        // ၂။ Modern & Internet တန်ဖိုးများပြရန် (09:30 AM နှင့် 02:00 PM)
        const mod930 = document.getElementById('modern-930');
        if (mod930 && data.modern930) mod930.innerText = data.modern930;

        const int930 = document.getElementById('internet-930');
        if (int930 && data.internet930) int930.innerText = data.internet930;

        const mod200 = document.getElementById('modern-200');
        if (mod200 && data.modern200) mod200.innerText = data.modern200;

        const int200 = document.getElementById('internet-200');
        if (int200 && data.internet200) int200.innerText = data.internet200;

        // ၃။ SET Sessions (11:00 AM နှင့် 03:00 PM)
        const ses1100 = document.getElementById('session-1100');
        if (ses1100 && data.session1100) ses1100.innerText = data.session1100;

        const ses1500 = document.getElementById('session-1500');
        if (ses1500 && data.session1500) ses1500.innerText = data.session1500;

        // ၄။ SET Sessions (12:01 PM အတွက် Set Index နှင့် Value)
        const set1201 = document.getElementById('set-1201');
        if (set1201 && data.set1201) set1201.innerText = data.set1201;

        const val1201 = document.getElementById('val-1201');
        if (val1201 && data.val1201) val1201.innerText = data.val1201;

        // ၅။ SET Sessions (04:30 PM အတွက် Set Index နှင့် Value)
        const set1630 = document.getElementById('set-1630');
        if (set1630 && data.set1630) set1630.innerText = data.set1630;

        const val1630 = document.getElementById('val-1630');
        if (val1630 && data.val1630) val1630.innerText = data.val1630;

        // ၆။ နောက်ဆုံး update လုပ်ချိန်ပြရန်
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
