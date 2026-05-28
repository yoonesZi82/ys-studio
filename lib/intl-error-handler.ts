import { IntlErrorCode } from "next-intl";
import type { IntlError } from "next-intl";

export function intlOnError(error: IntlError) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return;
  }

  console.error(error);
}
