import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import { appTimeZone } from "@/i18n/config";
import { intlOnError } from "@/lib/intl-error-handler";

const locales = ["en", "fa"] as const;

function isAppLocale(value: string | undefined): value is (typeof locales)[number] {
  return value === "en" || value === "fa";
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!isAppLocale(locale)) {
    const store = await cookies();
    const cookieLocale = store.get("locale")?.value;
    locale = isAppLocale(cookieLocale) ? cookieLocale : "en";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: appTimeZone,
    onError: intlOnError,
  };
});
