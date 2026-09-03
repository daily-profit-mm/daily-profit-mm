async function fetchLiveData() {
    try {
        const response = await fetch('https://daily-profit-mm.vercel.app/api/live');
        const data = await response.json();

        // ၁။ Current Result (Live SET, Value & TWOD)
        if (data.live) {
            const resultNumberElem = document.querySelector('.result-number');
            if (resultNumberElem && data.live.twod) {
                resultNumberElem.innerText = data.live.twod; 
            }
            
            const setElem = document.querySelector('.stats .stat:nth-child(1) .stat-value');
            if (setElem) setElem.innerText = data.live.set || '--';

            const valElem = document.querySelector('.stats .stat:nth-child(2) .stat-value');
            if (valElem) valElem.innerText = data.live.value || '--';
        }

        // ၂။ Result Array ထဲမှ အချိန်အလိုက် Sessions များနှင့် Modern & Internet တန်ဖိုးများကို ချိန်ညှိခြင်း
        if (data.result && Array.isArray(data.result)) {
            data.result.forEach(item => {
                const time = item.open_time;

                // 09:30 AM / 11:00 AM Sessions (Morning)
                if (time === "09:30:00" || time === "11:00:00") {
                    if (time === "11:00:00") {
                        const ses11 = document.getElementById('session-1100');
                        if (ses11) ses11.innerText = item.twod || '--';
                    }
                    const mod930 = document.getElementById('modern-930');
                    if (mod930 && item.modern) mod930.innerText = item.modern;
                    
                    const int930 = document.getElementById('internet-930');
                    if (int930 && item.internet) int930.innerText = item.internet;
                }

                // 12:00 PM / 12:01 PM / 02:00 PM Sessions (Midday)
                if (time === "12:00:00" || time === "12:01:00") {
                    const set12 = document.getElementById('set-1201');
                    if (set12) set12.innerText = item.set || '--';
                    
                    const val12 = document.getElementById('val-1201');
                    if (val12) val12.innerText = item.value || '--';
                    
                    const mod200 = document.getElementById('modern-200');
                    if (mod200 && item.modern) mod200.innerText = item.modern;
                    
                    const int200 = document.getElementById('internet-200');
                    if (int200 && item.internet) int200.internet = item.internet;
                }

                // 03:00 PM Session (Afternoon)
                if (time === "15:00:00") {
                    const ses15 = document.getElementById('session-1500');
                    if (ses15) ses15.innerText = item.twod || '--';
                }

                // 04:30 PM Session (Evening Close)
                if (time === "16:30:00") {
                    const set16 = document.getElementById('set-1630');
                    if (set16) set16.innerText = item.set || '--';
                    
                    const val16 = document.getElementById('val-1630');
                    if (val16) val16.innerText = item.value || '--';
                }
            });
        }

        // ၃။ နောက်ဆုံး update လုပ်ချိန်
        const updateElem = document.querySelector('.update');
        if (updateElem && data.server_time) {
            updateElem.innerText = `Last update: ${data.server_time}`;
        }

    } catch (error) {
        console.error('API Error:', error);
    }
}

fetchLiveData();
setInterval(fetchLiveData, 60000);
