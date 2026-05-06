import { NextIntlClientProvider } from "next-intl";
import React from "react";

async function NextIntelProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const messages = (await import(`../messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default NextIntelProvider;
