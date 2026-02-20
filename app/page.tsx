export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section
        id="inicio"
        className="
    relative h-screen flex items-center justify-center text-white
    bg-[url('/hero-mobile.jpg')]
    lg:bg-[url('/banner.jpg')]
    bg-cover bg-center
  "
      >

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001f3d]/80 via-[#001f3d]/60 to-[#001f3d]/90"></div>

        {/* Contenido */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Protegemos lo que más importa
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Asesoramiento profesional en seguros de autos, motos, hogar y personas.
          </p>

          <a
            href="/cotizacion"
            className="
bg-[#163594] px-10 py-4 rounded-lg text-white font-semibold
hover:bg-blue-700 hover:scale-105
shadow-lg shadow-[#163594]/40
transition-all duration-300
      "
          >
            Solicitar Cotización
          </a>
        </div>

        <div className="absolute bottom-10 animate-bounce text-white opacity-70 text-center w-full text-2xl">
          ↓
        </div>
      </section>

      {/* ================= ASEGURADORAS ================= */}
      <section className="py-8 bg-white text-center overflow-hidden">
        {/* Carrusel */}
        <div className="relative overflow-hidden max-w-7xl mx-auto">

          <div className="mb-6">


            <h2 className="text-3xl md:text-4xl font-bold text-[#001f3d] mt-2">
              Aseguradoras con las que trabajamos
            </h2>

            <div className="w-20 h-1 bg-[#163594] mx-auto mt-4 rounded-full"></div>
          </div>

          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Trabajamos con las compañías líderes del mercado para brindarte
            las mejores coberturas y el respaldo que merecés.
          </p>



          {/* Fade lateral opcional (muy elegante) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="flex w-max animate-scroll">

            {/* BLOQUE 1 */}
            <div className="flex gap-16 items-center px-8">
              <img src="/logos/rus.png" className="logo h-15" />
              <img src="/logos/federacion.png" className="logo h-25" />
              <img src="/logos/rivadavia.avif" className="logo h-25" />
              <img src="/logos/atm.webp" className="logo h-20" />
              <img src="/logos/galeno.png" className="logo h-20" />
              <img src="/logos/experta.png" className="logo h-18" />
              <img src="/logos/sancor.png" className="logo h-25" />
              <img src="/logos/san-cristobal.png" className="logo h-25" />

            </div>

            {/* BLOQUE 2 */}
            <div className="flex gap-16 items-center px-8">
              <img src="/logos/rus.png" className="logo h-15" />
              <img src="/logos/federacion.png" className="logo h-25" />
              <img src="/logos/rivadavia.avif" className="logo h-25" />
              <img src="/logos/atm.webp" className="logo h-20" />
              <img src="/logos/galeno.png" className="logo h-20" />
              <img src="/logos/experta.png" className="logo h-18" />
              <img src="/logos/sancor.png" className="logo h-25" />
              <img src="/logos/san-cristobal.png" className="logo h-25" />
            </div>

          </div>
        </div>
      </section>


{/* ================= SERVICIOS ================= */}
<section
  id="servicios"
  className="py-28 bg-gray-100 text-center"
>
  <div className="max-w-7xl mx-auto px-6">

    {/* Encabezado */}
    <div className="mb-16">
      <span className="text-sm uppercase tracking-widest text-[#163594] font-semibold">
        Coberturas Disponibles
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-[#001f3d] mt-3">
        Nuestros Servicios
      </h2>

      <div className="w-20 h-1 bg-[#163594] mx-auto mt-5 rounded-full"></div>

      <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
        Brindamos soluciones adaptadas a cada necesidad con el respaldo de compañías líderes.
      </p>
    </div>

    {/* Grid */}
    <div className="grid md:grid-cols-3 gap-10">

      {/* AUTOMOTOR */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
        <h3 className="text-xl font-semibold text-[#163594] mb-4">
          Seguro Automotor
        </h3>

        <p className="text-gray-600 mb-4">
          Protección integral para tu vehículo con distintas opciones de cobertura.
        </p>

        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Responsabilidad Civil</li>
          <li>Terceros Completos</li>
          <li>Todo Riesgo</li>
        </ul>
      </div>

      {/* HOGAR */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
        <h3 className="text-xl font-semibold text-[#163594] mb-4">
          Seguro de Hogar
        </h3>

        <p className="text-gray-600 mb-4">
          Resguardo para tu vivienda y bienes personales ante imprevistos.
        </p>

        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Incendio</li>
          <li>Robo</li>
          <li>Daños por fenómenos naturales</li>
        </ul>
      </div>

      {/* VIDA */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
        <h3 className="text-xl font-semibold text-[#163594] mb-4">
          Seguro de Vida
        </h3>

        <p className="text-gray-600 mb-4">
          Seguridad financiera para proteger a tu familia.
        </p>

        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Vida Individual</li>
          <li>Vida Colectivo</li>
          <li>Ahorro y retiro</li>
        </ul>
      </div>

      {/* RESPONSABILIDAD CIVIL */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
        <h3 className="text-xl font-semibold text-[#163594] mb-4">
          Responsabilidad Civil
        </h3>

        <p className="text-gray-600 mb-4">
          Protección ante daños a terceros en actividades profesionales o comerciales.
        </p>

        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Profesional</li>
          <li>Comercial</li>
          <li>Eventos</li>
        </ul>
      </div>

      {/* ACCIDENTES PERSONALES */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
        <h3 className="text-xl font-semibold text-[#163594] mb-4">
          Accidentes Personales
        </h3>

        <p className="text-gray-600 mb-4">
          Cobertura ante accidentes en actividades laborales o recreativas.
        </p>

        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Individual</li>
          <li>Colectivo</li>
          <li>Actividades específicas</li>
        </ul>
      </div>

      {/* INCENDIO */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
        <h3 className="text-xl font-semibold text-[#163594] mb-4">
          Seguro contra Incendio
        </h3>

        <p className="text-gray-600 mb-4">
          Protección para propiedades ante riesgos de incendio y daños asociados.
        </p>

        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Casa</li>
          <li>Departamento</li>
          <li>Comercial</li>
        </ul>
      </div>

    </div>

  </div>
</section>
      

      {/* ================= PLANES ================= */}
      <section
        id="planes"
        className="py-24 bg-white text-center"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#001f3d] mb-12">
            Planes Destacados
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="border border-gray-200 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Plan Básico</h3>
              <p className="text-gray-600 mb-6">
                Cobertura esencial a precio accesible.
              </p>
              <button className="bg-[#163594] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Consultar
              </button>
            </div>

            <div className="border-2 border-[#163594] p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#163594]">
                Plan Premium
              </h3>
              <p className="text-gray-600 mb-6">
                Máxima protección y beneficios exclusivos.
              </p>
              <button className="bg-[#163594] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Consultar
              </button>
            </div>

            <div className="border border-gray-200 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Plan Corporativo</h3>
              <p className="text-gray-600 mb-6">
                Soluciones personalizadas para empresas.
              </p>
              <button className="bg-[#163594] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Consultar
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ================= NOSOTROS ================= */}
      <section className="py-24 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#001f3d] mb-8">
            ¿Por qué elegirnos?
          </h2>

          <p className="text-gray-700 text-lg">
            Más de 10 años asesorando clientes con compromiso, transparencia
            y acompañamiento personalizado en cada etapa.
          </p>
        </div>
      </section>


      {/* ================= CONTACTO ================= */}
      <section
        id="contacto"
        className="py-24 bg-[#001f3d] text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">
            Contactanos
          </h2>

          <p className="text-gray-300 mb-8">
            Estamos listos para asesorarte y encontrar la mejor cobertura para vos.
          </p>

          <button className="bg-[#163594] px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            Enviar Consulta
          </button>
        </div>
      </section>

    </main>
  );
}
