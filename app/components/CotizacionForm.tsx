"use client";

import { useState } from "react";
import { validarCotizacion } from "@/lib/validators";

export default function CotizacionForm({ tipoInicial }: { tipoInicial?: string }) {
  const [tipoSeguro, setTipoSeguro] = useState(tipoInicial || "");
  const [coberturaAuto, setCoberturaAuto] = useState("");


  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    marca: "",
    modelo: "",
    anio: "",
    uso: "",
    gnc: "",
    localidad: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsApp = () => {
    const nuevosErrores = validarCotizacion(tipoSeguro, coberturaAuto, formData);

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    setErrors({});

    let detalleAuto = "";

    if (tipoSeguro === "automotor") {
      detalleAuto = `
Cobertura: ${coberturaAuto}
Marca: ${formData.marca}
Modelo: ${formData.modelo}
Año: ${formData.anio}
Uso: ${formData.uso}
GNC: ${formData.gnc}
Localidad: ${formData.localidad}
`;
    }

    const mensaje = `
Nueva Cotización Web

Tipo de Seguro: ${tipoSeguro}

Datos del Cliente:
Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}

${detalleAuto}
`;

    window.open(
      `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Título */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-[#163594] font-semibold">
            Cotización Online
          </span>

          <h1 className="text-4xl font-bold text-[#001f3d] mt-2">
            Solicitá tu Cotización
          </h1>

          <div className="w-20 h-1 bg-[#163594] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="bg-white p-10 rounded-2xl shadow-xl">

          {/* Tipo seguro */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-[#001f3d]">
              Tipo de Seguro
            </label>

            <div className="flex flex-col">
  <select
    value={tipoSeguro}
    onChange={(e) => setTipoSeguro(e.target.value)}
    className={`inputStyle appearance-none bg-white ${
      !tipoSeguro ? "text-gray-400" : "text-gray-700"
    }`}
  >
    <option value="" >
      Seleccionar tipo de seguro
    </option>
    <option value="automotor">Automotor</option>
    <option value="incendio">Incendio</option>
    <option value="responsabilidad">Responsabilidad Civil</option>
    <option value="accidentes">Accidentes Personales</option>
  </select>
</div>
          </div>

          {/* Datos personales */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="flex flex-col">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                onChange={handleChange}
                className={`inputStyle ${errors.nombre ? "border-red-500" : ""}`}
              />
              <div className="min-h-[20px]">
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nombre}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className={`inputStyle ${errors.email ? "border-red-500" : ""}`}
              />
              <div className="min-h-[20px]">
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                onChange={handleChange}
                className={`inputStyle ${errors.telefono ? "border-red-500" : ""}`}
              />
              <div className="min-h-[20px]">
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                )}
              </div>
            </div>
          </div>

          {/* CAMPOS CONDICIONALES AUTOMOTOR */}
          <div
            className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    transform
                    ${tipoSeguro === "automotor"
                ? "max-h-[1000px] opacity-100 scale-100 translate-y-0 mt-8 pt-8 border-t"
                : "max-h-0 opacity-0 scale-95 -translate-y-2"
              }
                  `}
          >

            {/* Selección de cobertura */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold text-[#001f3d]">
                Tipo de Cobertura
              </label>

              <select
                value={coberturaAuto}
                onChange={(e) => setCoberturaAuto(e.target.value)}
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#163594] outline-none transition ${errors.coberturaAuto ? "border-red-500" : ""}`}
              >
                {errors.coberturaAuto && (
                  <p className="text-red-500 text-sm mt-1">{errors.coberturaAuto}</p>
                )}
                <option value="">Seleccionar cobertura</option>
                <option value="Responsabilidad Civil">Responsabilidad Civil (RC)</option>
                <option value="Terceros Completos">Terceros Completos</option>
                <option value="Todo Riesgo">Todo Riesgo</option>
              </select>
            </div>

            <h2 className="text-xl font-semibold text-[#163594] mb-6">
              Datos del Vehículo
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="marca"
                  placeholder="Marca"
                  onChange={handleChange}
                  className={`inputStyle ${errors.marca ? "border-red-500" : ""}`}
                />
                <div className="min-h-[20px]">
                  {errors.marca && (
                    <p className="text-red-500 text-sm mt-1">{errors.marca}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="modelo"
                  placeholder="Modelo"
                  onChange={handleChange}
                  className={`inputStyle ${errors.modelo ? "border-red-500" : ""}`}
                />
                <div className="min-h-[20px]">
                  {errors.modelo && (
                    <p className="text-red-500 text-sm mt-1">{errors.modelo}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <input
                  type="number"
                  name="anio"
                  placeholder="Año"
                  onChange={handleChange}
                  className={`inputStyle ${errors.anio ? "border-red-500" : ""}`}
                />
                <div className="min-h-[20px]">
                  {errors.anio && (
                    <p className="text-red-500 text-sm mt-1">{errors.anio}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <select
                  name="uso"
                  onChange={handleChange}
                  className={`inputStyle ${errors.uso ? "border-red-500" : ""}`}
                >
                  <option value="">Uso del vehículo</option>
                  <option value="particular">Particular</option>
                  <option value="comercial">Comercial</option>
                </select>

                <div className="min-h-[20px]">
                  {errors.uso && (
                    <p className="text-red-500 text-sm mt-1">{errors.uso}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <select
                  name="gnc"
                  onChange={handleChange}
                  className={`inputStyle ${errors.gnc ? "border-red-500" : ""}`}
                >
                  <option value="">¿Posee GNC?</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>

                <div className="min-h-[20px]">
                  {errors.gnc && (
                    <p className="text-red-500 text-sm mt-1">{errors.gnc}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="localidad"
                  placeholder="Localidad"
                  onChange={handleChange}
                  className={`inputStyle ${errors.localidad ? "border-red-500" : ""}`}
                />
                <div className="min-h-[20px]">
                  {errors.localidad && (
                    <p className="text-red-500 text-sm mt-1">{errors.localidad}</p>
                  )}
                </div>
              </div>
            </div>
          </div>


          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <button
              className="flex-1 bg-[#163594] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md cursor-pointer"
            >
              Enviar por Email
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex-1 border border-[#163594] text-[#163594] py-3 rounded-lg font-semibold hover:bg-[#163594] hover:text-white transition cursor-pointer"
            >
              Enviar por WhatsApp
            </button>
          </div>


        </div>

      </div>
    </main>
  );
}