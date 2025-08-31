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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-sm ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="absolute inset-0 bg-[linear-gradient(130deg,#1B4332_0%,#2D6A4F_25%,#40916C_50%,#2D6A4F_75%,#1B4332_100%)] animate-gradient-slow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.08),transparent_50%)]" />
      </div>
      <div className={`relative z-10 container mx-auto px-6 flex flex-col md:flex-row justify-between items-center transition-all duration-300`}>
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
            <span className={`ml-3 font-black tracking-wide text-white hover:text-white/80 transition-all duration-300 uppercase ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              Dieta
              <span className="text-[#0F4229] ml-1">
                Integral
              </span>
            </span>
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-secondary-foreground hover:text-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div 
          className={`fixed md:hidden top-0 right-0 w-full backdrop-blur-sm transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
          style={{ 
            marginTop: isScrolled ? '56px' : '72px',
            height: `calc(100vh - ${isScrolled ? '56px' : '72px'})`,
            boxShadow: isMenuOpen ? '-4px 0 15px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <div className="absolute inset-0 bg-[#1B4332] opacity-95">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C]" />
          </div>
          <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
            <nav className="flex flex-col items-center justify-between min-h-full py-8 px-6">
              <div className="flex flex-col items-center space-y-8">
                <Link href="/articulos" 
                      className="text-white hover:text-white/80 text-xl font-semibold transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}>
                  Artículos
                </Link>
                <Link href="/sobre-mi" 
                      className="text-white hover:text-white/80 text-xl font-semibold transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}>
                  Sobre mí
                </Link>
                <Link href="/contacto" 
                      className="text-white hover:text-white/80 text-xl font-semibold transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}>
                  Contacto
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 mt-auto pb-4">
                <Link href="https://www.facebook.com/dieta.integral.CU" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-all duration-300">
                  <Facebook size={28} />
                </Link>
                <Link href="https://www.instagram.com/dieta.integral" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-all duration-300">
                  <Instagram size={28} />
                </Link>
                <Link href="https://www.youtube.com/@dietaintegral" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-all duration-300">
                  <Youtube size={28} />
                </Link>
                <Link href="https://t.me/dietaintegral" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-white/80 transition-all duration-300">
                  <Send size={28} />
                </Link>
              </div>
            </nav>
          </div>
        </div>

        <nav className="hidden md:flex flex-col md:flex-row items-center space-y-4 font-bold md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          <Link href="/articulos" className="text-white hover:text-white/80 transition-all duration-300">Artículos</Link>
          <Link href="/sobre-mi" className="text-white hover:text-white/80 transition-all duration-300">Sobre mí</Link>
          <Link href="/contacto" className="text-white hover:text-white/80 transition-all duration-300">Contacto</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="https://www.facebook.com/dieta.integral.CU" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
            <Facebook size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
          <Link href="https://www.instagram.com/dieta.integral" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
            <Instagram size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
          <Link href="https://www.youtube.com/@dieta.integral" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
            <Youtube size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
          <Link href="https://t.me/dieta_integral" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-all duration-300">
            <Send size={isScrolled ? 20 : 24} className="transition-all duration-300" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
