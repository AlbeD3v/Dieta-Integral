"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Menu, X, Youtube, Leaf } from 'lucide-react';
import { Fragment } from 'react';
import { useScrolled } from '@/shared/hooks/useScrolled';
import { useMenuOpen } from '@/shared/hooks/useMenuOpen';

const navLinks = [
  { href: '/articulos', label: 'Blog' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
];

const Header = () => {
  const scrolled = useScrolled(20);
  const { isOpen: isMenuOpen, close: closeMenu, toggle: toggleMenu } = useMenuOpen();

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'} border-b border-border/60`}>
      {/* Green top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1B4332] via-[#40916C] to-[#74C69D]" />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand lockup ──────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="Dieta Integral — inicio">
            <Image
              src="/imagen_logo_svg.svg"
              alt="Dieta Integral"
              width={34}
              height={34}
              priority
              className="w-[34px] h-[34px] flex-shrink-0"
            />
            <div className="flex items-baseline gap-1.5 leading-none select-none">
              <span className="font-brand text-[1.1rem] font-light italic tracking-[0.28em] uppercase text-[#B08D57] group-hover:text-[#9A7A4A] transition-colors">
                Dieta
              </span>
              <span className="font-brand text-[1.4rem] font-bold tracking-[0.05em] uppercase text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors">
                Integral
              </span>
            </div>
          </Link>

          {/* ── Separator brand/nav ───────────────────────── */}
          <span className="hidden md:block h-6 w-px bg-foreground/12 mx-2 flex-shrink-0" aria-hidden="true" />

          {/* ── Desktop nav ───────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map(({ href, label }, i) => (
              <Fragment key={href}>
                <Link
                  href={href}
                  className="relative group px-3 py-1 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-foreground/65 hover:text-[#B08D57] transition-colors duration-200 pb-[4px]"
                >
                  {label}
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] w-0 bg-[#B08D57] group-hover:w-[calc(100%-1.5rem)] transition-all duration-200 rounded-full" aria-hidden="true" />
                </Link>
                {i < navLinks.length - 1 && (
                  <span className="text-foreground/20 text-[0.55rem] select-none pointer-events-none px-0.5" aria-hidden="true">·</span>
                )}
              </Fragment>
            ))}
          </nav>

          {/* ── Separator nav/actions ─────────────────────── */}
          <span className="hidden md:block h-6 w-px bg-foreground/12 mx-2 flex-shrink-0" aria-hidden="true" />

          {/* ── Right: socials + CTA ─────────────────────── */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Link href="https://www.facebook.com/profile.php?id=61580212888512" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </Link>
              <Link href="https://www.instagram.com/aleserrano_dietaintegral/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </Link>
              <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={16} />
              </Link>
            </div>
            <Link
              href="/planes"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B4332] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white hover:bg-[#2D6A4F] transition-colors"
            >
              <Leaf className="w-3 h-3" />
              Comenzar
            </Link>
          </div>

          {/* ── Mobile hamburger ─────────────────────────── */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-primary p-2 -mr-1"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* ── Mobile menu ────────────────────────────────────── */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] md:hidden"
            aria-hidden="true"
            onClick={closeMenu}
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className={`fixed md:hidden w-full bg-background transition-transform duration-200 ease-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            style={{ top: 0, height: '100dvh' }}
          >
            <div className="h-[3px] w-full bg-gradient-to-r from-[#1B4332] via-[#40916C] to-[#74C69D]" />

            {/* Panel top bar */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-border/40">
              <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}
                aria-label="Inicio">
                <Image src="/imagen_logo_svg.svg" alt="Logo" width={28} height={28} className="w-7 h-7" />
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="font-brand text-[0.95rem] font-light italic tracking-[0.28em] uppercase text-[#B08D57]">Dieta</span>
                  <span className="font-brand text-[1.2rem] font-bold tracking-[0.05em] uppercase text-[#1B4332]">Integral</span>
                </div>
              </Link>
              <button aria-label="Cerrar menú" className="p-2 text-foreground hover:text-primary" onClick={closeMenu}>
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-between min-h-[calc(100dvh-4.25rem)] py-12 px-6" aria-label="Menú móvil">
              <div className="flex flex-col items-center gap-9">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[0.85rem] font-bold uppercase tracking-[0.32em] text-foreground/65 hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/planes"
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#1B4332] px-8 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white hover:bg-[#2D6A4F] transition-colors"
                  onClick={closeMenu}
                >
                  <Leaf className="w-4 h-4" />
                  Comenzar
                </Link>
              </div>

              <div className="flex items-center gap-8 pb-8 text-muted-foreground">
                <Link href="https://www.facebook.com/profile.php?id=61580212888512" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook">
                  <Facebook size={22} />
                </Link>
                <Link href="https://www.instagram.com/aleserrano_dietaintegral/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram size={22} />
                </Link>
                <Link href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="YouTube">
                  <Youtube size={22} />
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
