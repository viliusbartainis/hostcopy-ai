"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("LanguageSwitcher");
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleSelect = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 border border-stone-300 rounded-full px-3 py-1.5 transition-colors"
      >
        <span>{localeFlags[locale]}</span>
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-44 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50">
            {locales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-stone-50 ${
                  code === locale ? "font-semibold text-stone-900" : "text-stone-600"
                }`}
              >
                <span>{localeFlags[code]}</span>
                <span>{localeNames[code]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
