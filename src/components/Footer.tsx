import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import ViewCounter from './ViewCounter';

const Footer = () => {
  return (
    <footer className="bg-[#1B4332] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Navigation Links */}
          <div className="space-y-4 flex flex-col justify-center items-center">
            <Link href="/articulos" className="block hover:text-white/80 transition-colors">
              Artículos
            </Link>
            <Link href="/acerca-de" className="block hover:text-white/80 transition-colors">
              Acerca de
            </Link>
          </div>

          {/* <div className="space-y-4">
            <Link href="/la-revolucion" className="block hover:text-white/80 transition-colors">
              Experiencia 
            </Link>
            <Link href="/empieza-ahora" className="block hover:text-white/80 transition-colors">
              Empieza Ahora
            </Link>
            <Link href="/sobre-el-autor" className="block hover:text-white/80 transition-colors">
              Sobre el autor
            </Link>
          </div> */}

          {/* Social Media Links */}
          <div className="space-y-4 flex flex-col justify-center items-center">
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
          <div className="flex flex-col justify-center items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity">
              Dieta Integral
            </Link>
            <p className="mt-4 text-sm text-white/70 text-center">
              {new Date().getFullYear()} Dieta Integral.
              <br />
              Todos los derechos reservados.
            </p>
            <div className="mt-4">
              <ViewCounter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
