import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { Language } from "./types";

const locales = routing.locales;

export default async function middleware(request: NextRequest) {
  let defaultLocale = routing.defaultLocale;

  try {
    const res = await fetch(
      "https://api.countryip.com/api/ip-info?level=basic",
      {
        headers: {
          apikey:
            "ae4b0a414bdcc8b7b0be3a998458bdf76375df32e8502beb91a4ab3b9ca51896",
        },
      }
    );
    const data = await res.json();
    const languages = Object.keys(data?.data?.countryDetails?.languages || {});

    const detectedLang = languages.find((lang) =>
      locales.includes(lang.substring(0, 2) as Language)
    );
    if (detectedLang) {
      defaultLocale = detectedLang.substring(0, 2) as Language;
    }
  } catch (error) {
    console.error("Failed to fetch IP language data:", error);
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
