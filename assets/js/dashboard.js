(function () {
  const lastUpdatedEl = document.getElementById("last-updated");
  const clockEl = document.getElementById("clock");

  function formatDate(value) {
    return new Intl.DateTimeFormat("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(value);
  }

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB");
    if (clockEl) clockEl.textContent = time;

    if (lastUpdatedEl) {
      lastUpdatedEl.textContent = formatDate(now);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  const langValue = localStorage.getItem("nwg-language") || "en";
  document.documentElement.lang = langValue;
  document.documentElement.setAttribute("data-lang", langValue);
})();
