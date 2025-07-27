import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/Logo-Dieta-Integral.png" alt="Dieta Integral Logo" width={40} height={40} style={{ height: 'auto' }} />
            <span className="ml-3 text-xl font-bold text-gray-800">Dieta Integral</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link href="/articulos" className="text-gray-600 hover:text-gray-800">Artículos</Link>
          <Link href="/sobre-mi" className="text-gray-600 hover:text-gray-800">Sobre mí</Link>
          <Link href="/contacto" className="text-gray-600 hover:text-gray-800">Contacto</Link>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button */}
        </div>
      </div>
    </header>
  );
};

export default Header;
