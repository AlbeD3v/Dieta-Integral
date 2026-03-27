"use client";

/**
 * ThemeProvider is now a no-op client component.
 * Theme is read server-side from cookies in layout.tsx.
 * This file is kept for backward compatibility if imported elsewhere.
 * To toggle theme client-side, call POST /api/theme which sets the cookie.
 */
export default function ThemeProvider() {
  return null;
}
