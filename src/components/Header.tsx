import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="flex items-center">
              <Image src="/Logo-Dieta-Integral.png" alt="Dieta Integral Logo" width={40} height={40} />
              <span className="ml-3 text-xl font-bold text-gray-800">Dieta Integral</span>
            </a>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" legacyBehavior><a className="text-gray-600 hover:text-gray-800">Home</a></Link>
          <Link href="/articulos" legacyBehavior><a className="text-gray-600 hover:text-gray-800">Artículos</a></Link>
          <Link href="/sobre-mi" legacyBehavior><a className="text-gray-600 hover:text-gray-800">Sobre mí</a></Link>
          <Link href="/contacto" legacyBehavior><a className="text-gray-600 hover:text-gray-800">Contacto</a></Link>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button */}
        </div>
      </div>
    </header>
  );
};

export default Header;
