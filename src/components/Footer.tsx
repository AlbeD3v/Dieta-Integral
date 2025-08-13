import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1B4332] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Navigation Links */}
          <div className="space-y-4">
            <Link href="/" className="block hover:text-white/80 transition-colors">
              Inicio
            </Link>
            <Link href="/articulos" className="block hover:text-white/80 transition-colors">
              Artículos
            </Link>
            <Link href="/programas" className="block hover:text-white/80 transition-colors">
              Programas
            </Link>
            <Link href="/podcast" className="block hover:text-white/80 transition-colors">
              Podcast
            </Link>
          </div>

          <div className="space-y-4">
            <Link href="/la-revolucion" className="block hover:text-white/80 transition-colors">
              La Revolución
            </Link>
            <Link href="/empieza-ahora" className="block hover:text-white/80 transition-colors">
              Empieza Ahora
            </Link>
            <Link href="/sobre-el-autor" className="block hover:text-white/80 transition-colors">
              Sobre el autor
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-start">
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity">
              Dieta Integral
            </Link>
            <p className="mt-4 text-sm text-white/70">
              {new Date().getFullYear()} Dieta Integral.
              <br />
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
