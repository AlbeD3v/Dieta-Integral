const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <p className="text-gray-600">&copy; 2025 Dieta Integral. Todos los derechos reservados.</p>
        <div className="flex items-center space-x-4">
          <a href="mailto:contacto@dietaintegral.com" className="text-gray-600 hover:text-gray-800">contacto@dietaintegral.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
