import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Container from '@/shared/ui/Container';

const Footer = () => {
  return (
    <footer className="border-t bg-background text-foreground">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Navegación */}
          <nav className="grid grid-cols-2 gap-2 justify-items-center text-sm md:flex md:flex-col md:items-start md:justify-start md:gap-2">
            {/* Orden requerido: Blog, Servicios, Sobre mí, Contacto. Inicio oculto y demás pendientes también ocultos. */}
            <Link href="/articulos" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/servicios" className="hover:text-foreground transition-colors">Servicios</Link>
            <Link href="/sobre-mi" className="hover:text-foreground transition-colors">Sobre mí</Link>
            <Link href="/contacto" className="hover:text-foreground transition-colors">Contacto</Link>
          </nav>

          {/* Sociales */}
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-medium text-sm text-muted-foreground">Síguenos</h3>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="https://www.instagram.com/aleserrano_dietaintegral/" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61580212888512" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@aleserrano-dietaintegral?si=1wLnpBcGUE5TngmR" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marca */}
          <div className="flex flex-col items-center md:items-end">
            <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-90 transition-opacity">
              Dieta Integral
            </Link>
            <p className="mt-2 text-xs text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} Dieta Integral. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
