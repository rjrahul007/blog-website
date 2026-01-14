"use client";

import ThemeToggle from "@/components/theme-toggle";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
}
