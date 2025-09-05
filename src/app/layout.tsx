import type { Metadata } from "next";
import { Libre_Baskerville } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header";
import Script from 'next/script';

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dieta Integral | Salud y Bienestar a través de la Alimentación Natural",
  description: "Descubre cómo mejorar tu salud a través de una alimentación consciente y natural. Aprende sobre nutrición integral, bienestar holístico y patrones alimenticios saludables.",
  keywords: "dieta integral, alimentación saludable, nutrición holística, bienestar, salud natural, alimentación consciente",
  openGraph: {
    title: "Dieta Integral | Salud y Bienestar Natural",
    description: "Transforma tu salud a través de una alimentación consciente y natural. Descubre los principios de la nutrición integral.",
    type: "website",
    locale: "es_ES",
    url: "https://dietaintegral.com",
    siteName: "Dieta Integral",
    images: [
      {
        url: "/Logo-Dieta-Integral.png",
        width: 1200,
        height: 630,
        alt: "Dieta Integral Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dieta Integral | Salud y Bienestar Natural",
    description: "Transforma tu salud a través de una alimentación consciente y natural",
    images: ["/Logo-Dieta-Integral.png"],
  },
  alternates: {
    canonical: "https://dietaintegral.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/manifest.json',
  themeColor: '#2D6A4F',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Dieta Integral',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/Logo-Dieta-Integral.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dieta Integral" />
        <meta name="google-site-verification" content="rVmF7S510SDBTeqCXcJaclDhFEMxZiCfgwyeGa5DH40" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${libreBaskerville.className} antialiased`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0W97LWP70P" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0W97LWP70P');
          `}
        </Script>
        <Header />
        <main className="pt-[88px] md:pt-[72px]">
          {children}
        </main>
      </body>
    </html>
  );
}
