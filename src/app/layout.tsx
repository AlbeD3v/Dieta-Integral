import type { Metadata } from "next";
import { Libre_Baskerville } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

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
      <body className={`${libreBaskerville.className} antialiased`}>
        <Header />
        <main className="pt-[88px] md:pt-[72px]">
          {children}
        </main>
      </body>
    </html>
  );
}
