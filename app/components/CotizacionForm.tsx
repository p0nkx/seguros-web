"use client";

import { useState } from "react";
import { validarCotizacion } from "@/lib/validators";
import { segurosConfig } from "@/lib/segurosConfig";


export default function CotizacionForm({ 
  tipoInicial, 
  coberturaInicial 
}: { 
  tipoInicial?: string; 
  coberturaInicial?: string; 
}) {
  // ================================
  // ESTADOS PRINCIPALES
  // ================================
  const [tipoSeguro, setTipoSeguro] = useState(tipoInicial || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Datos base + dinámicos
  const [formData, setFormData] = useState<any>({
    nombre: "",
    email: "",
    telefono: "",
    cobertura: coberturaInicial || "", // <-- Si existe coberturaInicial, la usa; si no, vacío.
  });

  // ================================
  // CONFIG DINÁMICA SEGÚN SEGURO
  // ================================
  const config =
    segurosConfig[tipoSeguro as keyof typeof segurosConfig];

  // ================================
  // HANDLE CHANGE UNIVERSAL
  // ================================
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // ENVÍO POR WHATSAPP
  // ================================
  const handleWhatsApp = () => {

    const nuevosErrores = validarCotizacion(
      tipoSeguro,
      formData
    );

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    setErrors({});

    // Construcción dinámica del detalle
    let detalleSeguro = "";

    if (config) {
      config.campos.forEach((campo) => {
        detalleSeguro += `${campo.label}: ${formData[campo.name] || "-"}\n`;
      });
    }

    const mensaje = `
Nueva Cotización Web

Tipo de Seguro: ${tipoSeguro}

Datos del Cliente:
Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}

${detalleSeguro}
`;

    window.open(
      `https://wa.me/+541164129888?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* ============================= */}
        {/* TÍTULO */}
        {/* ============================= */}
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-[#163594] font-semibold">
            Cotización Online
          </span>

          <h1 className="text-4xl font-bold text-[#001f3d] mt-2">
            Solicitá tu Cotización
          </h1>

          <div className="w-20 h-1 bg-[#163594] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* ============================= */}
        {/* CARD */}
        {/* ============================= */}
        <div className="bg-white p-10 rounded-2xl shadow-xl">

          {/* ============================= */}
          {/* TIPO DE SEGURO */}
          {/* ============================= */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-[#001f3d]">
              Tipo de Seguro
            </label>

            <div className="flex flex-col">
              <select
                value={tipoSeguro}
                aria-label="tipo de seguro"
                
                onChange={(e) => setTipoSeguro(e.target.value)}
                className={`inputStyle appearance-none bg-white ${
                  !tipoSeguro ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <option value="">
                  Seleccionar tipo de seguro
                </option>
                <option value="automotor">Automotor</option>
                <option value="vida">Vida</option>
                <option value="hogar">Hogar</option>
                <option value="responsabilidad">Responsabilidad Civil</option>
                <option value="accidentes">Accidentes Personales</option>
                <option value="incendio">Incendio</option>
                <option value="otros">Otros</option>
              </select>

              <div className="min-h-[20px]">
                {errors.tipoSeguro && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tipoSeguro}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ============================= */}
          {/* DATOS PERSONALES */}
          {/* ============================= */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="flex flex-col">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
                className={`inputStyle ${
                  errors.nombre ? "border-red-500" : ""
                }`}
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
                value={formData.email}
                onChange={handleChange}
                className={`inputStyle ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              <div className="min-h-[20px]">
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                type="number"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className={`inputStyle ${
                  errors.telefono ? "border-red-500" : ""
                }`}
              />
              <div className="min-h-[20px]">
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.telefono}
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* ============================= */}
          {/* CAMPOS DINÁMICOS SEGÚN SEGURO */}
          {/* ============================= */}
          <div
            className={`
              overflow-hidden transition-all duration-500 ease-in-out
              transform
              ${
                config
                  ? "max-h-[2000px] opacity-100 scale-100 translate-y-0 mt-8 pt-8 border-t"
                  : "max-h-0 opacity-0 scale-95 -translate-y-2"
              }
            `}
          >
            {config && (
              <>
                <h2 className="text-xl font-semibold text-[#163594] mb-6">
                  {config.titulo}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {config.campos.map((campo) => (
                    <div key={campo.name} className="flex flex-col">

                      {campo.type === "select" ? (
                        <select
                          name={campo.name}
                          aria-label={campo.label}
                          value={formData[campo.name] || ""}
                          onChange={handleChange}
                          className={`inputStyle ${
                            errors[campo.name] ? "border-red-500" : ""
                          }`}
                        >
                          <option value=""
                          aria-label={`Seleccionar ${campo.label}`}>
                            Seleccionar {campo.label}
                          </option>

                          {campo.options?.map((op) => (
                            <option key={op} value={op}>
                              {op}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={campo.type}
                          name={campo.name}
                          placeholder={campo.label}
                          value={formData[campo.name] || ""}
                          onChange={handleChange}
                          className={`inputStyle ${
                            errors[campo.name] ? "border-red-500" : ""
                          }`}
                        />
                      )}

                      <div className="min-h-[20px]">
                        {errors[campo.name] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[campo.name]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ============================= */}
          {/* BOTONES */}
          {/* ============================= */}
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