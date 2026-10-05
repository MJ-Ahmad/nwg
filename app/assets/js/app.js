document.addEventListener("DOMContentLoaded", async () => {
  const lang = localStorage.getItem("nwg-language") || "en";
  document.documentElement.lang = lang;
  document.documentElement.setAttribute("data-lang", lang);

  const toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = document.documentElement.lang === "bn" ? "en" : "bn";
      localStorage.setItem("nwg-language", next);
      document.documentElement.lang = next;
      document.documentElement.setAttribute("data-lang", next);
      location.reload();
    });
  }

  await renderDashboard();
});
