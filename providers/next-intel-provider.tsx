import React from "react";

import { NextIntlClientProviderWithErrors } from "@/providers/next-intl-client-provider";

async function NextIntelProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const messages = (await import(`../messages/${locale}.json`)).default;
  return (
    <NextIntlClientProviderWithErrors locale={locale} messages={messages}>
      {children}
    </NextIntlClientProviderWithErrors>
  );
}

export default NextIntelProvider;
