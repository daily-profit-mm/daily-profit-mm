async function updateLiveData() {
  try {
    const response = await fetch("/api/live", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // =========================
    // CURRENT LIVE RESULT
    // =========================
    const live = data.live || {};

    const resultNumber = document.querySelector(".result-number");
    const updateText = document.querySelector(".update");

    if (resultNumber) {
      resultNumber.textContent = live.twod || "--";
    }

    if (updateText) {
      if (live.time) {
        const time = live.time.split(" ")[1] || live.time;
        updateText.textContent = "Last update: " + time;
      } else {
        updateText.textContent = "Last update: --";
      }
    }

    // =========================
    // SET INDEX + VALUE
    // =========================
    const stats = document.querySelectorAll(".stat-value");

    if (stats[0]) {
      stats[0].textContent = live.set || "--";
    }

    if (stats[1]) {
      stats[1].textContent = live.value || "--";
    }

    // =========================
    // SET SESSIONS
    // =========================
    const sessions = Array.isArray(data.result)
      ? data.result
      : [];

    const results = document.querySelectorAll(".session-result");

    results.forEach((element, index) => {
      const session = sessions[index];

      if (session && session.twod) {
        element.textContent = session.twod;
      } else {
        element.textContent = "--";
      }
    });

    // =========================
    // MODERN & INTERNET
    // =========================
    //
    // Current /api/live response does NOT contain
    // modern / internet values.
    //
    // So don't show fake data.
    //

    const marketCards = document.querySelectorAll(".market");

    marketCards.forEach((card) => {
      const rows = card.querySelectorAll(".market-row b");

      rows.forEach((value) => {
        value.textContent = "--";
      });
    });

    console.log("Live data updated:", data);

  } catch (error) {
    console.error("Live data error:", error);

    // Don't destroy existing data if API temporarily fails.
    // Only show -- if there is no current value.

    const resultNumber = document.querySelector(".result-number");

    if (resultNumber && !resultNumber.textContent.trim()) {
      resultNumber.textContent = "--";
    }
  }
}


// =========================
// INITIAL LOAD
// =========================
updateLiveData();


// =========================
// AUTO REFRESH
// Every 10 seconds
// =========================
setInterval(updateLiveData, 10000);
