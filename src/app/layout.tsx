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
  description: "Descubre una nueva forma de entender la nutrición y la salud a través de la Dieta Integral. Aprende sobre alimentación consciente y bienestar holístico.",
  metadataBase: new URL('https://dietaintegral.fit'),
  icons: {
    icon: '/imagen_logo_svg.svg',
    shortcut: '/imagen_logo_svg.svg',
    apple: '/imagen_logo_svg.svg',
    other: {
      rel: 'image_src',
      url: '/imagen_logo_svg.svg'
    }
  },
  openGraph: {
    title: 'Dieta Integral',
    description: 'Descubre una nueva forma de entender la nutrición y la salud a través de la Dieta Integral',
    url: 'https://dietaintegral.fit',
    siteName: 'Dieta Integral',
    images: [{
      url: '/imagen_logo_svg.svg',
      alt: 'Dieta Integral - Nutrición y Salud Holística'
    }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dieta Integral',
    description: 'Nutrición y Salud Holística',
    images: ['/imagen_logo_svg.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
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
