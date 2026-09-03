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

        // ၂။ Result Array ထဲက Sessions များ (11:00, 12:01, 15:00, 16:30)
        if (data.result && Array.isArray(data.result)) {
            data.result.forEach(item => {
                if (item.open_time === "11:00:00") {
                    const ses11 = document.getElementById('session-1100');
                    if (ses11) ses11.innerText = item.twod || '--';

                } else if (item.open_time === "12:01:00" || item.open_time === "12:00:00") {
                    const set12 = document.getElementById('set-1201');
                    if (set12) set12.innerText = item.set || '--';
                    const val12 = document.getElementById('val-1201');
                    if (val12) val12.innerText = item.value || '--';

                } else if (item.open_time === "15:00:00") {
                    const ses15 = document.getElementById('session-1500');
                    if (ses15) ses15.innerText = item.twod || '--';

                } else if (item.open_time === "16:30:00") {
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
