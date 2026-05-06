import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const cookieLocale = request.cookies.get("locale")?.value;

  let locale = cookieLocale;

  // اگر cookie نبود → از browser بگیر
  if (!locale) {
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang?.startsWith("fa")) {
      locale = "fa";
    } else {
      locale = defaultLocale;
    }
  }

  // 👇 این مهمه: rewrite بدون تغییر URL
  return NextResponse.rewrite(
    new URL(`/${locale}${request.nextUrl.pathname}`, request.url),
  );
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
