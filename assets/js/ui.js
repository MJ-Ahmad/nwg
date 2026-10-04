(function () {
  function renderNavigation(items, lang) {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    nav.innerHTML = items
      .map((item) => {
        const label = item.label?.[lang] || item.label?.en || item.key;
        return `<a class="nav-link" href="#${item.key}">${label}</a>`;
      })
      .join('');
  }

  function renderMetrics(items, lang) {
    const container = document.getElementById('metrics-grid');
    if (!container) return;

    container.innerHTML = items
      .map((item) => {
        const label = item.label?.[lang] || item.label?.en || item.key;
        const context = item.context?.[lang] || item.context?.en || '';
        return `
          <div class="metric-card">
            <div class="metric-label">${label}</div>
            <p class="metric-value">${item.value}</p>
            <div class="metric-context">${context}</div>
          </div>
        `;
      })
      .join('');
  }

  function renderModules(modules, lang) {
    const container = document.getElementById('module-grid');
    if (!container) return;

    const entries = Object.entries(modules).map(([key, value]) => {
      const title = value.title?.[lang] || value.title?.en || key;
      const description = value.description?.[lang] || value.description?.en || '';
      const status = value.status?.[lang] || value.status?.en || 'Ready';
      const iconMap = {
        identity: '◈',
        governance: '◎',
        geogrid: '⌖',
        reporting: '▣',
        analytics: '◌',
        command: '✦',
        ledger: '▤',
        zone: '◍',
        core: '⬢'
      };

      return `
        <article class="module-card" id="${key}">
          <div class="module-top">
            <div class="module-icon" aria-hidden="true">${iconMap[key] || '•'}</div>
            <span class="module-status">${status}</span>
          </div>
          <div>
            <h4>${title}</h4>
            <p>${description}</p>
          </div>
        </article>
      `;
    });

    container.innerHTML = entries.join('');
  }

  function applyTranslations(data, lang) {
    const i18nNodes = document.querySelectorAll('[data-i18n]');
    i18nNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n');
      const path = key.split('.');
      let value = data;
      for (const part of path) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          value = null;
          break;
        }
      }
      const text = value?.[lang] || value?.en || node.textContent;
      node.textContent = text;
    });

    renderNavigation(data.navigation, lang);
    renderMetrics(data.metrics, lang);
    renderModules(data.modules, lang);
  }

  window.NWG = window.NWG || {};
  window.NWG.ui = { applyTranslations, renderNavigation, renderMetrics, renderModules };
})();
