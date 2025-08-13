import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

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
        <Header />
        <main className="pt-[88px] md:pt-[72px]">
          {children}
        </main>
      </body>
    </html>
  );
}
