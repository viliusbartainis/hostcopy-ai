export const locales = ["en", "lt", "es", "pt", "fr", "de", "it", "pl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    en: "English",
    lt: "Lietuvių",
    es: "Español",
    pt: "Português",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    pl: "Polski",
};

export const localeFlags: Record<Locale, string> = {
    en: "🇬🇧",
    lt: "🇱🇹",
    es: "🇪🇸",
    pt: "🇵🇹",
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    pl: "🇵🇱",
};

export function isLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}
