import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

function detectLocale(acceptLanguage: string | null): Locale {
    if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
      .split(",")
      .map((part) => {
              const [tag, qValue] = part.trim().split(";q=");
              return { tag: tag.trim().toLowerCase(), q: qValue ? parseFloat(qValue) : 1 };
      })
      .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
        const base = tag.split("-")[0];
        if ((locales as readonly string[]).includes(base)) {
                return base as Locale;
        }
  }

  return defaultLocale;
                      }

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const existing = request.cookies.get(COOKIE_NAME)?.value;

  if (!existing || !(locales as readonly string[]).includes(existing)) {
        const detected = detectLocale(request.headers.get("accept-language"));
        response.cookies.set(COOKIE_NAME, detected, {
                path: "/",
                maxAge: 60 * 60 * 24 * 365,
                sameSite: "lax",
        });
  }

  return response;
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
