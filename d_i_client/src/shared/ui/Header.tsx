"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Menu, X, Youtube, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'} border-b border-border/60`}>
      {/* Green top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1B4332] via-[#40916C] to-[#74C69D]" />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-15">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/imagen_logo_svg.svg"
              alt="Dieta Integral Logo"
              width={36}
              height={36}
              priority
              className="w-9 h-9"
            />
            <span className="font-black tracking-wider text-primary group-hover:text-primary/80 transition-colors uppercase text-xl leading-none">
              Dieta <span className="ml-0.5">Integral</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 font-medium text-[0.875rem]">
            <Link href="/articulos" className="relative pb-0.5 text-foreground/75 hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Blog</Link>
            <Link href="/servicios" className="relative pb-0.5 text-foreground/75 hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Servicios</Link>
            <Link href="/sobre-mi" className="relative pb-0.5 text-foreground/75 hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Sobre mí</Link>
            <Link href="/contacto" className="relative pb-0.5 text-foreground/75 hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Contacto</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Link href="https://www.facebook.com/profile.php?id=61580212888512" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook size={17} />
              </Link>
              <Link href="https://www.instagram.com/aleserrano_dietaintegral/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram size={17} />
              </Link>
              <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Youtube size={17} />
              </Link>
            </div>
            <Link
              href="/planes"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B4332] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2D6A4F] transition-colors"
            >
              <Leaf className="w-3.5 h-3.5" />
              Comenzar
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
            className={`fixed md:hidden w-full bg-white transition-transform duration-200 ease-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            style={{ top: 0, height: '100vh' }}
          >
            {/* Green accent */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#1B4332] via-[#40916C] to-[#74C69D]" />
            {/* Top bar inside panel */}
            <div className="flex items-center justify-between px-6 h-15 border-b border-border/40">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Image src="/imagen_logo_svg.svg" alt="Logo" width={28} height={28} className="w-7 h-7" />
                <span className="font-extrabold tracking-wide text-primary uppercase text-lg">Dieta Integral</span>
              </Link>
              <button aria-label="Cerrar menú" className="p-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-between min-h-[calc(100vh-4.25rem)] py-10 px-6">
              <div className="flex flex-col items-center gap-8">
                <Link href="/articulos" className="text-2xl font-bold text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                <Link href="/servicios" className="text-2xl font-bold text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Servicios</Link>
                <Link href="/sobre-mi" className="text-2xl font-bold text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre mí</Link>
                <Link href="/contacto" className="text-2xl font-bold text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
                <Link
                  href="/planes"
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#1B4332] px-8 py-3.5 text-base font-bold text-white hover:bg-[#2D6A4F] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Leaf className="w-4 h-4" />
                  Ver planes
                </Link>
              </div>
              <div className="flex items-center gap-8 mb-8 text-muted-foreground">
                <Link href="https://www.facebook.com/profile.php?id=61580212888512" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Facebook size={24} />
                </Link>
                <Link href="https://www.instagram.com/aleserrano_dietaintegral/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram size={24} />
                </Link>
                <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
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
