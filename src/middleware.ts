
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { Language } from "./types";

const locales = routing.locales;

export default async function middleware(request: NextRequest) {
  let defaultLocale = routing.defaultLocale;

  try {
    
    const res = await fetch(new URL("/api/lang-detect", request.url));
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const languages = Object.keys(data?.countryDetails?.languages || {});

    const detectedLang = languages.find((lang) =>
      locales.includes(lang.substring(0, 2) as Language)
    );

    if (detectedLang) {
      defaultLocale = detectedLang.substring(0, 2) as Language;
    }
  } catch (error) {
    console.error("Failed to detect language via API:", error);
  }

  const handleI18nRouting = createMiddleware({
    ...routing,
    defaultLocale: defaultLocale,
    localeDetection: false,
  });

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
