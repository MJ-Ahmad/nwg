(function () {
  const STORAGE_KEY = 'nwg-language';
  const defaultLang = 'en';

  function getSavedLanguage() {
    return localStorage.getItem(STORAGE_KEY) || defaultLang;
  }

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  function toggleLanguage() {
    const nextLang = document.documentElement.lang === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
  }

  function initializeLanguage() {
    const preferred = getSavedLanguage();
    setLanguage(preferred === 'bn' ? 'bn' : 'en');
  }

  window.NWG = window.NWG || {};
  window.NWG.lang = {
    getSavedLanguage,
    setLanguage,
    toggleLanguage,
    initializeLanguage
  };

  document.addEventListener('DOMContentLoaded', initializeLanguage);
})();
