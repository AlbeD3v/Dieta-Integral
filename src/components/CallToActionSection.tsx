const CallToActionSection = () => {
  return (
    <section className="bg-green-500 text-white">
      <div className="container mx-auto px-6 py-12 text-center">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h2 className="text-3xl font-bold">"Pequeños cambios, grandes resultados"</h2>
        <p className="mt-4 text-lg">Suscríbete a nuestro boletín para recibir los últimos artículos y consejos.</p>
        <div className="mt-8">
          <input type="email" placeholder="Tu correo electrónico" className="px-4 py-3 rounded-l-full w-64 text-gray-800" />
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 rounded-r-full font-semibold">Suscribirse</button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
