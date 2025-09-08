import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

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

          {/* Social Media Links */}
          <div className="space-y-4 flex flex-col justify-center items-center">
            <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/aleserrano_dietaintegral/" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61580212888512" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6" />
              </a>
              {/* Redes sociales pendientes */}
              {/* <a href="https://t.me/dietaintegral" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Telegram className="w-6 h-6" />
              </a> */}
              {/* <a href="https://youtube.com/@dietaintegral" className="hover:text-white/80 transition-colors" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6" />
              </a> */}
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
