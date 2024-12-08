export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const languageNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};
