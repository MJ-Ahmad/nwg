(function () {
  async function fetchData() {
    const response = await fetch('./data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Unable to load data.json');
    }
    return response.json();
  }

  function bindLanguageToggle() {
    const toggleButton = document.getElementById('lang-toggle');
    if (!toggleButton) return;

    toggleButton.addEventListener('click', () => {
      window.NWG.lang.toggleLanguage();
    });
  }

  function handleLanguageChange() {
    document.addEventListener('languagechange', async (event) => {
      const lang = event.detail.lang;
      try {
        const data = await fetchData();
        window.NWG.ui.applyTranslations(data, lang);
        document.documentElement.lang = lang;
      } catch (error) {
        console.error('Translation update failed:', error);
      }
    });
  }

  async function init() {
    bindLanguageToggle();
    handleLanguageChange();

    try {
      const data = await fetchData();
      const initialLang = window.NWG.lang.getSavedLanguage();
      window.NWG.ui.applyTranslations(data, initialLang);
      document.documentElement.lang = initialLang;
    } catch (error) {
      console.error('Could not initialize application:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
