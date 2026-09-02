// Daily Profit-MM - Live Data Script
async function fetchLiveData() {
    try {
        // ဥပမာ - JSONPlaceholder သို့မဟုတ် သင်၏ API Endpoint ဖြင့် အစားထိုးပါ
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();

        // ဥပမာအနေဖြင့် API မှလာသော ဒေတာများကို HTML ထဲသို့ ထည့်သွင်းခြင်း
        // မိမိတို့ အသုံးပြုမည့် API ဖွဲ့စည်းပုံအပေါ်မူတည်၍ properties များကို ပြင်ဆင်နိုင်ပါသည်
        
        // ကြီးမားသော Result နံပါတ်နေရာတွင် ပြရန်
        const resultNumberElem = document.querySelector('.result-number');
        if (resultNumberElem) {
            resultNumberElem.innerText = "85"; // API မှရလာသော နံပါတ်ဖြင့် အစားထိုးရန်
        }

        // နောက်ဆုံး update လုပ်ချိန်ပြရန်
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
fetchLiveData(https://daily-profit-mm.vercel.app/api/live);

// လိုအပ်ပါက သတ်မှတ်ထားသော အချိန်အလိုက် (ဥပမာ- ၁ မိနစ်တစ်ကြိမ်) အလိုအလျောက် ဒေတာဆွဲထုတ်ရန်
setInterval(fetchLiveData, 60000);
