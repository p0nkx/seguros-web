import {
  TruckIcon,
  HomeIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  FireIcon
} from "@heroicons/react/24/outline";

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


      </section>

      {/* ================= ASEGURADORAS ================= */}
      <section className="py-8 bg-white text-center overflow-hidden">

        <div className="mb-6">


          <h2 className="text-3xl md:text-4xl font-bold text-[#001f3d] mt-2">
            Aseguradoras con las que trabajamos
          </h2>

          <div className="w-20 h-1 bg-[#163594] mx-auto mt-4 rounded-full"></div>
        </div>

        <p className="text-gray-600 mb-12 max-w-2xl mx-auto px-6">
          Trabajamos con las compañías líderes del mercado para brindarte
          las mejores coberturas y el respaldo que merecés.
        </p>

        {/* Carrusel */}
        <div className="relative overflow-hidden max-w-7xl mx-auto">





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
        className="py-20 bg-gray-100 text-center"
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


          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-10">

            {/* AUTOMOTOR */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">

              <TruckIcon className="w-10 h-10 text-[#163594] mb-4" />

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

              <a href="/cotizacion?tipo=automotor"
                className="inline-block mt-6 text-sm font-semibold text-[#163594] hover:underline"
              >
                Cotizar ahora →
              </a>

            </div>

            {/* HOGAR */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
              <HomeIcon className="w-10 h-10 text-[#163594] mb-4" />
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

              <a href="/cotizacion?tipo=hogar"
                className="inline-block mt-6 text-sm font-semibold text-[#163594] hover:underline"
              >
                Cotizar ahora →
              </a>

            </div>

            {/* VIDA */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
              <HeartIcon className="w-10 h-10 text-[#163594] mb-4" />
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

              <a href="/cotizacion?tipo=vida"
                className="inline-block mt-6 text-sm font-semibold text-[#163594] hover:underline"
              >
                Cotizar ahora →
              </a>

            </div>

            {/* RESPONSABILIDAD CIVIL */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
              <ShieldCheckIcon className="w-10 h-10 text-[#163594] mb-4" />
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

              <a href="/cotizacion?tipo=responsabilidad"
                className="inline-block mt-6 text-sm font-semibold text-[#163594] hover:underline"
              >
                Cotizar ahora →
              </a>

            </div>

            {/* ACCIDENTES PERSONALES */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
              <UserGroupIcon className="w-10 h-10 text-[#163594] mb-4" />
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

              <a href="/cotizacion?tipo=accidentes"
                className="inline-block mt-6 text-sm font-semibold text-[#163594] hover:underline"
              >
                Cotizar ahora →
              </a>

            </div>

            {/* INCENDIO */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left">
              <FireIcon className="w-10 h-10 text-[#163594] mb-4" />
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

              <a href="/cotizacion?tipo=incendio"
                className="inline-block mt-6 text-sm font-semibold text-[#163594] hover:underline"
              >
                Cotizar ahora →
              </a>

            </div>

          </div>
          <br />
          <span className="text-sm uppercase tracking-widest text-[#163594] font-semibold">
            Y mucho más...
          </span>
        </div>
      </section>

      {/* ================= Planes ================= */}

      <section
        id="planes"
        className="py-20 bg-gray-50 text-center"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Encabezado */}
          <div className="mb-20">
            <span className="text-sm uppercase tracking-widest text-[#163594] font-semibold">
              Seguro Automotor
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-[#001f3d] mt-3">
              Niveles de Cobertura
            </h2>

            <div className="w-20 h-1 bg-[#163594] mx-auto mt-5 rounded-full"></div>

            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Elegí el nivel de protección que mejor se adapte a tu vehículo y a tu tranquilidad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 items-stretch">

            {/* RESPONSABILIDAD CIVIL */}
            <div className="flex flex-col justify-between bg-white border border-gray-200 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-left">

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#001f3d]">
                  Responsabilidad Civil
                </h3>

                <p className="text-gray-600 mb-6">
                  Es el seguro mínimo obligatorio por ley para poder circular.
                  Cubre daños ocasionados a terceros en caso de accidente.
                  <span className="block mt-2 font-medium text-gray-800">
                    No cubre daños propios del vehículo.
                  </span>
                </p>
              </div>

              <a
                href="/cotizacion?tipo=automotor&subtipo=Responsabilidad Civil"
                className="mt-8 inline-block text-center bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-300 transition"
              >
                Cotizar RC
              </a>
            </div>

            {/* TERCEROS COMPLETOS */}
            <div className="relative flex flex-col justify-between bg-white border-2 border-[#163594] p-12 rounded-3xl shadow-2xl scale-105 text-left">

              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#163594] text-white text-xs px-5 py-2 rounded-full shadow-md">
                Más elegido
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#163594]">
                  Terceros Completos
                </h3>

                <p className="text-gray-600 mb-6">
                  Protección amplia con excelente equilibrio entre precio y cobertura.
                </p>

                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✔ Responsabilidad Civil</li>
                  <li>✔ Destrucción total por accidente</li>
                  <li>✔ Incendio total y parcial</li>
                  <li>✔ Robo o hurto total y parcial</li>
                  <li>✔ Reposición de cristales</li>
                  <li>✔ Grúa hasta 300 km</li>
                  <li>✔ Cobertura contra granizo</li>
                </ul>
              </div>

              <a
                href="/cotizacion?tipo=automotor&subtipo=Terceros Completos"
                className="mt-8 inline-block text-center bg-[#163594] text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
              >
                Cotizar Terceros
              </a>
            </div>

            {/* TODO RIESGO */}
            <div className="flex flex-col justify-between bg-white border border-gray-200 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-left">

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#001f3d]">
                  Todo Riesgo
                </h3>

                <p className="text-gray-600 mb-6">
                  La cobertura más completa disponible.
                  Protege tanto daños a terceros como daños propios,
                  incluso cuando el accidente es responsabilidad del conductor.
                  Funciona con franquicia: pagás un monto fijo y la compañía cubre el resto.
                </p>
              </div>

              <a
                href="/cotizacion?tipo=automotor&subtipo=Todo Riesgo"
                className="mt-8 inline-block text-center bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-300 transition"
              >
                Cotizar Todo Riesgo
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ================= NOSOTROS ================= */}
      <section className="py-28 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-[#001f3d] mb-6">
            ¿Por qué elegirnos?
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            No solo cotizamos seguros. Acompañamos a nuestros clientes antes, durante y después de cada decisión,
            brindando asesoramiento claro y personalizado.
          </p>

          <div className="grid md:grid-cols-3 gap-10 text-left">

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-[#163594] text-xl mb-4">
                Asesoramiento Personalizado
              </h3>
              <p className="text-gray-600">
                Analizamos tu situación y te recomendamos la mejor cobertura según tus necesidades,
                no según una compañía específica.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-[#163594] text-xl mb-4">
                Trabajamos con Múltiples Aseguradoras
              </h3>
              <p className="text-gray-600">
                Cotizamos entre las principales compañías del mercado para ofrecerte
                la mejor relación entre precio y protección.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-[#163594] text-xl mb-4">
                Acompañamiento en Siniestros
              </h3>
              <p className="text-gray-600">
                En caso de un imprevisto, no estás solo.
                Te guiamos en cada paso del proceso para que todo sea más simple.
              </p>
            </div>

          </div>
        </div>
      </section>


     {/* ================= CTA FINAL ================= */}
<section
  id="contacto"
  className="py-28 bg-[#001f3d] text-white text-center"
>
  <div className="max-w-4xl mx-auto px-6">

    <h2 className="text-4xl md:text-4xl font-bold mb-6">
      ¿Listo para proteger lo que más importa?
    </h2>

    <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto">
      Recibí asesoramiento personalizado sin compromiso.
      Te ayudamos a elegir la cobertura ideal según tu necesidad.
    </p>

    {/* <div className="flex flex-col md:flex-row gap-4 justify-center">

      <a
        href="/cotizacion"
        className="bg-[#163594] px-10 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
      >
        Solicitar Cotización
      </a>

      <a
        href="https://wa.me/549XXXXXXXXXX"
        target="_blank"
        className="border border-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#001f3d] transition"
      >
        Escribinos por WhatsApp
      </a>

    </div> */}

    <p className="text-sm text-gray-400 mt-8">
      Respuesta rápida • Atención personalizada • Sin compromiso
    </p>

  </div>
</section>

    </main>
  );
}
