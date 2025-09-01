import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';



/* esto es un comentario */
export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <FeaturedArticles />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
