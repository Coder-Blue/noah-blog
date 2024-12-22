"use client";

import * as React from "react";
import { usePathname } from "@/i18n/routing";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const pathname = usePathname();
  const forcedThemeFromPathname = pathname === "/" ? "light" : undefined;

  return (
    <NextThemesProvider {...props} forcedTheme={forcedThemeFromPathname}>
      {children}
    </NextThemesProvider>
  );
}
