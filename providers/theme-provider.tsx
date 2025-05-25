"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  readonly children: ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps & Record<string, unknown>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
