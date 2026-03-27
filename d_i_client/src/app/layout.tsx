import type { Metadata } from "next";
import Script from 'next/script';
import { Libre_Baskerville, Cormorant_Garamond } from 'next/font/google';
import { cookies } from 'next/headers';
import "./globals.css";
import { Header } from "@shared";
import SessionProvider from "@/shared/ui/SessionProvider";

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-brand',
});

export const metadata: Metadata = {
  title: {
    default: 'Dieta Integral — Alimentación consciente, nutrición ancestral y salud holística',
    template: '%s | Dieta Integral',
  },
  description: 'Dieta Integral: sistema de salud holística que integra alimentación consciente, nutrición ancestral, ritmos circadianos, sueño reparador y hábitos saludables. Acompañamiento personalizado para optimizar tu energía, bienestar y claridad mental.',
  metadataBase: new URL('https://dietaintegral.fit'),
  keywords: [
    'dieta integral', 'alimentación consciente', 'nutrición ancestral',
    'salud holística', 'salud integral', 'hábitos saludables',
    'ritmos circadianos', 'sueño reparador', 'ayuno intermitente',
    'nutrición real', 'bienestar integral', 'coherencia biológica',
    'alimentación ancestral', 'estilo de vida saludable',
    'acompañamiento nutricional', 'optimizar energía',
    'claridad mental', 'salud natural', 'nutrición funcional',
    'alimentación y salud',
  ],
  authors: [{ name: 'Ale Serrano — Dieta Integral', url: 'https://dietaintegral.fit' }],
  creator: 'Dieta Integral',
  publisher: 'Dieta Integral',
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
    title: 'Dieta Integral — Alimentación consciente y salud holística',
    description: 'Sistema integral de salud: nutrición ancestral, ritmos circadianos, sueño y hábitos. Acompañamiento personalizado para una vida con más energía y bienestar.',
    url: 'https://dietaintegral.fit',
    siteName: 'Dieta Integral',
    images: [{
      url: 'https://dietaintegral.fit/og-image.png',
      alt: 'Dieta Integral — Alimentación consciente, nutrición ancestral y salud holística',
      width: 1200,
      height: 630,
    }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dieta Integral — Alimentación consciente y salud holística',
    description: 'Sistema integral: nutrición ancestral, ritmos circadianos, sueño y hábitos para optimizar tu salud.',
    images: ['https://dietaintegral.fit/og-image.png'],
    creator: '@aleserrano_di',
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
  },
  alternates: {
    canonical: 'https://dietaintegral.fit',
  },
  category: 'health',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';

  return (
    <html lang="es" className={`${libreBaskerville.variable} ${cormorantGaramond.variable} ${theme === 'dark' ? 'dark' : ''}`}>
      <head>
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
      </head>
      <body className="antialiased">
        <SessionProvider>
        {/* JSON-LD Organization */}
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dieta Integral",
            "alternateName": "Dieta Integral — Alimentación consciente y salud holística",
            "url": "https://dietaintegral.fit/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://dietaintegral.fit/imagen_logo_svg.svg",
              "width": 512,
              "height": 512
            },
            "image": "https://dietaintegral.fit/og-image.png",
            "description": "Sistema integral de salud que combina alimentación consciente, nutrición ancestral, ritmos circadianos y hábitos saludables para optimizar tu bienestar.",
            "founder": {
              "@type": "Person",
              "name": "Ale Serrano"
            },
            "sameAs": [
              "https://www.instagram.com/aleserrano_dietaintegral/",
              "https://youtube.com/@aleserrano-dietaintegral"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": ["Spanish"]
            }
          })}
        </Script>
        {/* JSON-LD WebSite */}
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dieta Integral",
            "alternateName": "dietaintegral.fit",
            "url": "https://dietaintegral.fit/",
            "description": "Alimentación consciente, nutrición ancestral y salud holística.",
            "inLanguage": "es",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://dietaintegral.fit/articulos?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>
        <Header />
        <main>
          {children}
        </main>
        </SessionProvider>
      </body>
    </html>
  );
}
