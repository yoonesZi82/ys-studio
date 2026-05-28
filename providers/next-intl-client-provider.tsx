"use client";

import { NextIntlClientProvider } from "next-intl";

import { appTimeZone } from "@/i18n/config";
import { intlOnError } from "@/lib/intl-error-handler";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export function NextIntlClientProviderWithErrors({
  children,
  locale,
  messages,
}: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={appTimeZone}
      onError={intlOnError}
    >
      {children}
    </NextIntlClientProvider>
  );
}
