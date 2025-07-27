import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dieta Integral",
  description: "Sitio web de Dieta Integral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
