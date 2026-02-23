"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Menu, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="fixed w-full top-0 z-50">
      <div className="w-full bg-[linear-gradient(130deg,#1B4332_0%,#2D6A4F_25%,#40916C_50%,#2D6A4F_75%,#1B4332_100%)]">
        <div className={`container mx-auto px-6 flex flex-col md:flex-row justify-between items-center ${isScrolled ? 'h-14 md:h-14' : 'h-22 md:h-18'}`}>
          <div className="flex items-center justify-between w-full md:w-auto h-full">
            <Link href="/" className="flex items-center">
              <Image
                src="/imagen_logo_svg.svg"
                alt="Dieta Integral Logo"
                width={40}
                height={40}
                priority
                className={`transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
              />
              <span className={`ml-3 font-black tracking-wide text-white hover:text-white/80 transition-all duration-300 uppercase ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                Dieta
                <span className="text-white ml-1">
                  Integral
                </span>
              </span>
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-white/80"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <Menu size={24} />
            </button>
          </div>

          <nav className="hidden md:flex flex-col md:flex-row items-center space-y-4 font-bold md:space-y-0 md:space-x-6 mt-4 md:mt-0">
            {/* Orden requerido: Blog, Servicios, Sobre mí, Contacto. Inicio oculto; demás ocultos por ahora. */}
            <Link href="/articulos" className="text-white hover:text-white/80 transition-all duration-300">Blog</Link>
            <Link href="/servicios" className="text-white hover:text-white/80 transition-all duration-300">Servicios</Link>
            <Link href="/sobre-mi" className="text-white hover:text-white/80 transition-all duration-300">Sobre mí</Link>
            <Link href="/contacto" className="text-white hover:text-white/80 transition-all duration-300">Contacto</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="https://www.facebook.com/profile.php?id=61580212888512" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
              <Facebook size={isScrolled ? 20 : 24} className="transition-all duration-300" />
            </Link>
            <Link href="https://www.instagram.com/aleserrano_dietaintegral/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
              <Instagram size={isScrolled ? 20 : 24} className="transition-all duration-300" />
            </Link>
            <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
              <Youtube size={isScrolled ? 20 : 24} className="transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] md:hidden"
            aria-hidden="true"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Panel */}
          <div 
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className={`fixed md:hidden w-full bg-background border-t border-border transition-transform duration-200 ease-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            style={{
              top: isScrolled ? '47px' : '63px',
              height: `calc(100vh - ${isScrolled ? '47px' : '63px'})`,
            }}>
            <nav className="flex flex-col items-center justify-between min-h-full py-8 px-6">
            <div className="flex flex-col items-center space-y-8">
              {/* Inicio oculto; demás rutas pendientes ocultas */}
              <Link href="/articulos" 
                    className="text-foreground hover:text-primary text-xl font-semibold transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/servicios" 
                    className="text-foreground hover:text-primary text-xl font-semibold transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
                Servicios
              </Link>
              <Link href="/sobre-mi" 
                    className="text-foreground hover:text-primary text-xl font-semibold transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
                Sobre mí
              </Link>
              <Link href="/contacto" 
                    className="text-foreground hover:text-primary text-xl font-semibold transition-colors"
                    onClick={() => setIsMenuOpen(false)}>
                Contacto
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 mb-8 text-muted-foreground">
              <Link href="https://www.facebook.com/profile.php?id=61580212888512" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="https://www.instagram.com/aleserrano_dietaintegral/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                <Youtube size={24} />
              </Link>
            </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
