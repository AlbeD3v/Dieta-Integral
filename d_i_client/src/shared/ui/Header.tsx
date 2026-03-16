"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Menu, X, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center group">
            <Image
              src="/imagen_logo_svg.svg"
              alt="Dieta Integral Logo"
              width={40}
              height={40}
              priority
              className="w-10 h-10"
            />
            <span className="ml-3 font-black tracking-wider text-primary group-hover:text-primary/80 transition-colors uppercase text-2xl">
              Dieta <span className="ml-1">Integral</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center font-semibold space-x-8">
            <Link href="/articulos" className="relative pb-1 text-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Blog</Link>
            <Link href="/servicios" className="relative pb-1 text-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Servicios</Link>
            <Link href="/sobre-mi" className="relative pb-1 text-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Sobre mí</Link>
            <Link href="/contacto" className="relative pb-1 text-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Contacto</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="https://www.facebook.com/profile.php?id=61580212888512" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="https://www.instagram.com/aleserrano_dietaintegral/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube size={20} />
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary p-2"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            style={{ top: 0, height: '100vh' }}>
            {/* Top bar inside panel */}
            <div className="flex items-center justify-between px-6 h-16 border-b">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Image src="/imagen_logo_svg.svg" alt="Logo" width={28} height={28} className="w-7 h-7" />
                <span className="ml-2 font-extrabold tracking-wide text-primary uppercase">Dieta Integral</span>
              </Link>
              <button aria-label="Cerrar menú" className="p-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-between min-h-[calc(100vh-4rem)] py-8 px-6">
            <div className="flex flex-col items-center space-y-7">
              {/* Inicio oculto; demás rutas pendientes ocultas */}
              <Link href="/articulos" 
                    className="relative text-foreground hover:text-primary text-2xl font-extrabold tracking-wide transition-colors pb-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-10"
                    onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/servicios" 
                    className="relative text-foreground hover:text-primary text-2xl font-extrabold tracking-wide transition-colors pb-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-10"
                    onClick={() => setIsMenuOpen(false)}>
                Servicios
              </Link>
              <Link href="/sobre-mi" 
                    className="relative text-foreground hover:text-primary text-2xl font-extrabold tracking-wide transition-colors pb-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-10"
                    onClick={() => setIsMenuOpen(false)}>
                Sobre mí
              </Link>
              <Link href="/contacto" 
                    className="relative text-foreground hover:text-primary text-2xl font-extrabold tracking-wide transition-colors pb-1 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-10"
                    onClick={() => setIsMenuOpen(false)}>
                Contacto
              </Link>
            </div>
            
            <div className="flex items-center space-x-8 mb-8 text-muted-foreground">
              <Link href="https://www.facebook.com/profile.php?id=61580212888512" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                <Facebook size={26} />
              </Link>
              <Link href="https://www.instagram.com/aleserrano_dietaintegral/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                <Instagram size={26} />
              </Link>
              <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">
                <Youtube size={26} />
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
