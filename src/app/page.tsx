import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

/* esto es un comentario */
export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dieta Integral',
    description: 'Descubre cómo mejorar tu salud a través de una alimentación consciente y natural. Aprende sobre nutrición integral y bienestar holístico.',
    url: 'https://dietaintegral.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://dietaintegral.com/buscar?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dieta Integral',
    url: 'https://dietaintegral.com',
    logo: 'https://dietaintegral.com/Logo-Dieta-Integral.png',
    sameAs: [
      'https://instagram.com/dietaintegral',
      // Agrega aquí otros perfiles sociales
    ]
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <div>
        <main>
          <HeroSection />
          <FeaturedArticles />
          <AboutSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
