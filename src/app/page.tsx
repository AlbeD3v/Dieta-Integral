import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import AboutSection from '@/components/AboutSection';
// import CallToActionSection from '@/components/CallToActionSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';


/* esto es un comentario */
export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <FeaturedArticles />
        <AboutSection />
        <NewsletterSection />
        {/* <CallToActionSection /> */}
      </main>
      <Footer />
    </div>
  );
}
