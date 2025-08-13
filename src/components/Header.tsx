"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Send, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <header className={`bg-secondary shadow-md fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className={`container mx-auto px-6 flex flex-col md:flex-row justify-between items-center transition-all duration-300`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" className="flex items-center">
            <Image 
              src="/Logo-Dieta-Integral.png" 
              alt="Dieta Integral Logo" 
              width={40} 
              height={40} 
              className={`transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
              style={{ width: 'auto', height: 'auto' }} 
            />
            <span className={`ml-3 font-black tracking-wide text-secondary-foreground hover:text-primary transition-all duration-300 uppercase ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              Dieta
              <span className="text-primary ml-1">
                Integral
              </span>
            </span>
          </Link>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-secondary-foreground hover:text-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`fixed md:hidden top-0 right-0 h-full w-full bg-secondary transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
             style={{ marginTop: isScrolled ? '56px' : '72px' }}>
          <nav className="flex flex-col items-center space-y-8 pt-8">
            <Link href="/" 
                  className="text-secondary-foreground/80 hover:text-primary text-xl"
                  onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/articulos" 
                  className="text-secondary-foreground/80 hover:text-primary text-xl"
                  onClick={() => setIsMenuOpen(false)}>
              Artículos
            </Link>
            <Link href="/sobre-mi" 
                  className="text-secondary-foreground/80 hover:text-primary text-xl"
                  onClick={() => setIsMenuOpen(false)}>
              Sobre mí
            </Link>
            <Link href="/contacto" 
                  className="text-secondary-foreground/80 hover:text-primary text-xl"
                  onClick={() => setIsMenuOpen(false)}>
              Contacto
            </Link>
            
            {/* Social Icons in Mobile Menu */}
            <div className="flex items-center space-x-6 mt-8">
              <Link href="https://www.facebook.com/dieta.integral.CU" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
                <Facebook size={28} />
              </Link>
              <Link href="https://www.instagram.com/dieta.integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
                <Instagram size={28} />
              </Link>
              <Link href="https://www.youtube.com/@dieta.integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
                <Youtube size={28} />
              </Link>
              <Link href="https://t.me/dieta_integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
                <Send size={28} />
              </Link>
            </div>
          </nav>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          <Link href="/" className="text-secondary-foreground/80 hover:text-primary">Home</Link>
          <Link href="/articulos" className="text-secondary-foreground/80 hover:text-primary">Artículos</Link>
          <Link href="/sobre-mi" className="text-secondary-foreground/80 hover:text-primary">Sobre mí</Link>
          <Link href="/contacto" className="text-secondary-foreground/80 hover:text-primary">Contacto</Link>
        </nav>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="https://www.facebook.com/dieta.integral.CU" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Facebook size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
          <Link href="https://www.instagram.com/dieta.integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Instagram size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
          <Link href="https://www.youtube.com/@dieta.integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Youtube size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
          <Link href="https://t.me/dieta_integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Send size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
