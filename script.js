async function updateLiveData() {
  try {
    const response = await fetch("/api/live");
    const data = await response.json();

    const live = data.live || {};

    document.querySelector(".result-number").textContent =
      live.twod || "--";

    document.querySelector(".update").textContent =
      live.time ? "Last update: " + live.time.split(" ")[1] : "Last update: --";

    const stats = document.querySelectorAll(".stat-value");

    if (stats[0]) stats[0].textContent = live.set || "--";
    if (stats[1]) stats[1].textContent = live.value || "--";

    const sessions = data.result || [];
    const results = document.querySelectorAll(".session-result");

    sessions.forEach((item, index) => {
      if (results[index]) {
        results[index].textContent = item.twod || "--";
      }
    });

  } catch (error) {
    console.log("Live data error:", error);
  }
}

updateLiveData();
setInterval(updateLiveData, 10000);
