"use client";
import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    let cancelled = false;
    const apply = (theme: string) => {
      const root = document.documentElement;
      const isDark = theme === 'dark';
      root.classList.toggle('dark', isDark);
    };

    const run = async () => {
      try {
        const res = await fetch('/api/theme', { cache: 'no-store' });
        if (!res.ok) return;
        const { theme } = await res.json();
        if (!cancelled && typeof theme === 'string') apply(theme);
      } catch {
        // ignore
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return null;
}
