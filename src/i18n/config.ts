export const locales = ["en", "vn"] as const;

export type Locale = (typeof locales)[number];

export const languageNames: Record<Locale, string> = {
  en: "English",
  vn: "Tiếng Việt",
};
