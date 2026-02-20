"use client";

import { useState } from "react";

export default function CotizacionForm({ tipoInicial }: { tipoInicial?: string }) {
  const [tipoSeguro, setTipoSeguro] = useState(tipoInicial || "");

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
    const mensaje = `
Nueva Cotización:

Tipo: ${tipoSeguro}
Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}

Marca: ${formData.marca}
Modelo: ${formData.modelo}
Año: ${formData.anio}
Uso: ${formData.uso}
GNC: ${formData.gnc}
Localidad donde duerme: ${formData.localidad}
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

            <select
              value={tipoSeguro}
              onChange={(e) => setTipoSeguro(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#163594] outline-none transition"
            >
              <option value="">Seleccionar</option>
              <option value="automotor">Automotor</option>
              <option value="incendio">Incendio</option>
              <option value="responsabilidad">Responsabilidad Civil</option>
              <option value="accidentes">Accidentes Personales</option>
            </select>
          </div>

          {/* Datos personales */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre Completo"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              onChange={handleChange}
              className="inputStyle md:col-span-2"
            />
          </div>

          {/* CAMPOS CONDICIONALES AUTOMOTOR */}
         <div
  className={`
    overflow-hidden transition-all duration-500 ease-in-out
    transform
    ${
      tipoSeguro === "automotor"
        ? "max-h-[1000px] opacity-100 scale-100 translate-y-0 mt-8 pt-8 border-t"
        : "max-h-0 opacity-0 scale-95 -translate-y-2"
    }
  `}
>

            <h2 className="text-xl font-semibold text-[#163594] mb-6">
              Datos del Vehículo
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="marca"
                placeholder="Marca"
                onChange={handleChange}
                className="inputStyle"
              />

              <input
                type="text"
                name="modelo"
                placeholder="Modelo"
                onChange={handleChange}
                className="inputStyle"
              />

              <input
                type="number"
                name="anio"
                placeholder="Año"
                onChange={handleChange}
                className="inputStyle"
              />

              <select
                name="uso"
                onChange={handleChange}
                className="inputStyle"
              >
                <option value="">Uso del vehículo</option>
                <option value="particular">Particular</option>
                <option value="comercial">Comercial</option>
              </select>

              <select
                name="gnc"
                onChange={handleChange}
                className="inputStyle"
              >
                <option value="">¿Posee GNC?</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>

              <input
                type="text"
                name="localidad"
                placeholder="Localidad donde duerme el vehículo"
                onChange={handleChange}
                className="inputStyle md:col-span-2"
              />

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