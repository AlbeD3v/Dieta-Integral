import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactoPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800">Contacto</h1>
        <p className="mt-4 text-lg text-center text-gray-600">
          Puedes contactarme a través del siguiente correo electrónico:
        </p>
        <p className="mt-4 text-lg text-center text-green-500 font-bold">
          <a href="mailto:contacto@dietaintegral.com">contacto@dietaintegral.com</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
