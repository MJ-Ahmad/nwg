(function () {
  const navTree = document.getElementById("nav-tree");
  if (!navTree) return;

  const menu = [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", count: "01" },
        { label: "Structure", count: "02" },
        { label: "Roles", count: "03" },
        { label: "Policy", count: "04" }
      ]
    },
    {
      title: "Core Layers",
      items: [
        { label: "Identity", count: "I" },
        { label: "Geo Grid", count: "G" },
        { label: "Analytics", count: "A" },
        { label: "Command", count: "C" }
      ]
    },
    {
      title: "System",
      items: [
        { label: "Sitemap", count: "S" },
        { label: "Reports", count: "R" },
        { label: "Docs", count: "D" }
      ]
    }
  ];

  navTree.innerHTML = menu.map(group => `
    <div class="nav-group">
      <div class="nav-title">${group.title}</div>
      ${group.items.map(item => `
        <a href="#" class="nav-item">
          <span>${item.label}</span>
          <span class="count">${item.count}</span>
        </a>
      `).join("")}
    </div>
  `).join("");

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const current = document.documentElement.lang === "bn" ? "en" : "bn";
      document.documentElement.lang = current;
      localStorage.setItem("nwg-language", current);
      document.documentElement.setAttribute("data-lang", current);
    });
  }
})();
