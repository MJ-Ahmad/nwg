async function loadJSON(url) {
  const res = await fetch(url);
  return res.json();
}

function renderMenu(menuData, lang = "en") {
  const tree = document.getElementById("menu-tree");
  if (!tree) return;

  tree.innerHTML = menuData.menu.map(group => `
    <div class="nav-group">
      <div class="nav-group-title">${lang === "bn" ? group.title_bn : group.title_en}</div>
      ${group.children.map(item => `
        <a class="nav-item" href="${item.href}">
          <span>${lang === "bn" ? item.label_bn : item.label_en}</span>
          <span class="nav-badge">${(lang === "bn" ? item.label_bn : item.label_en).charAt(0)}</span>
        </a>
      `).join("")}
    </div>
  `).join("");
}

async function renderDashboard() {
  const lang = localStorage.getItem("nwg-language") || "en";

  const navData = await loadJSON("/app/config/navigation.json");
  renderMenu(navData, lang);

  const geography = await loadJSON("/app/config/geography.json");
  const roles = await loadJSON("/app/config/roles.json");
  const policies = await loadJSON("/app/config/policies.json");

  const geographyBox = document.getElementById("geography-box");
  if (geographyBox) {
    geographyBox.innerHTML = `
      <h3>${lang === "bn" ? "ভৌগোলিক নিয়ন্ত্রণ ব্যবস্থা" : "Geographic Control System"}</h3>
      <p>${lang === "bn" ? geography.structure_bn : geography.structure_en}</p>
    `;
  }

  const roleList = document.getElementById("role-list");
  if (roleList) {
    roleList.innerHTML = roles.roles.slice(0, 5).map(r => `
      <li>${lang === "bn" ? r.name_bn : r.name_en}</li>
    `).join("");
  }

  const policyList = document.getElementById("policy-list");
  if (policyList) {
    policyList.innerHTML = policies.policies.map(p => `
      <li>${lang === "bn" ? p.name_bn : p.name_en}</li>
    `).join("");
  }
}
