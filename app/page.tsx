export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">

      <h1 className="text-6xl font-bold text-blue-900 mb-4">
        Hola DHEEEEEM estoy probando vercel, hastga ahora copado
      </h1>
      <h2 className="text-4xl font-bold text-blue-900 mb-4">
        Productora de Seguros Elfab
      </h2>

      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Ofrecemos seguros de autos, motos, personas y responsabilidad civil.
        Trabajamos con múltiples aseguradoras para brindarte la mejor opción.
      </p>

      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Cotizar Seguro
        </button>

        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-100">
          Contacto
        </button>
      </div>
    </main>
  );
}
