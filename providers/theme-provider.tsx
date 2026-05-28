"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/** React 19 dev warning from next-themes' FOUC-prevention inline script. */
function useSuppressNextThemesScriptWarning() {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const original = console.error;
    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Encountered a script tag")
      ) {
        return;
      }
      original.apply(console, args);
    };
    return () => {
      console.error = original;
    };
  }, []);
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useSuppressNextThemesScriptWarning();
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
