import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-secondary shadow-md">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/Logo-Dieta-Integral.png" alt="Dieta Integral Logo" width={40} height={40} style={{ width: 'auto', height: 'auto' }} />
            <span className="ml-3 text-xl font-bold text-secondary-foreground">Dieta Integral</span>
          </Link>
        </div>
        <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          <Link href="/" className="text-secondary-foreground/80 hover:text-primary">Home</Link>
          <Link href="/articulos" className="text-secondary-foreground/80 hover:text-primary">Artículos</Link>
          <Link href="/sobre-mi" className="text-secondary-foreground/80 hover:text-primary">Sobre mí</Link>
          <Link href="/contacto" className="text-secondary-foreground/80 hover:text-primary">Contacto</Link>
        </nav>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="https://www.facebook.com/dieta.integral.CU" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Facebook size={24} />
          </Link>
          <Link href="https://www.instagram.com/dieta.integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Instagram size={24} />
          </Link>
          <Link href="https://www.youtube.com/@dieta.integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Youtube size={24} />
          </Link>
          <Link href="https://t.me/dieta_integral" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary">
            <Send size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
