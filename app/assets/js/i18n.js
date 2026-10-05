const I18N = {
  en: {
    dashboard: "Dashboard",
    structure: "Structure",
    roles: "Roles",
    policy: "Policy",
    admin: "Admin Panel",
    api: "API",
    overview: "Overview",
    systems: "Systems",
    administration: "Administration"
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    structure: "গঠন",
    roles: "ভূমিকা",
    policy: "নীতি",
    admin: "অ্যাডমিন প্যানেল",
    api: "এপিআই",
    overview: "সংক্ষিপ্ত বিবরণ",
    systems: "সিস্টেম",
    administration: "প্রশাসন"
  }
};

function getText(key, lang = "en") {
  return I18N[lang]?.[key] || I18N.en[key] || key;
}
