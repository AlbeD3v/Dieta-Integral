import type { Metadata } from "next";
import { Libre_Baskerville } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";
import { Header } from "@shared";
import ThemeProvider from "./theme-provider";

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dieta Integral",
  description: "Alimentación consciente y hábitos con enfoque ancestral y práctico. Recursos y acompañamiento para una vida más integral.",
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
    description: 'Alimentación consciente y hábitos con enfoque ancestral y práctico',
    url: 'https://dietaintegral.fit',
    siteName: 'Dieta Integral',
    images: [{
      url: 'https://dietaintegral.fit/imagen_logo_svg.svg',
      alt: 'Dieta Integral — Alimentación consciente y hábitos',
      width: 1200,
      height: 630,
      type: 'image/svg+xml',
    }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dieta Integral',
    description: 'Alimentación consciente y hábitos con enfoque ancestral y práctico',
    images: ['https://dietaintegral.fit/imagen_logo_svg.svg']
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
        <ThemeProvider />
        {/* JSON-LD Organization */}
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dieta Integral",
            "url": "https://dietaintegral.fit/",
            "logo": "https://dietaintegral.fit/imagen_logo_svg.svg",
            "sameAs": [
              "https://www.instagram.com/aleserrano_dietaintegral/",
              "https://youtube.com/@aleserrano-dietaintegral"
            ]
          })}
        </Script>
        {/* JSON-LD WebSite */}
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dieta Integral",
            "url": "https://dietaintegral.fit/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://dietaintegral.fit/articulos?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
