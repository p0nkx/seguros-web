"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001f3d] to-[#163594] px-6 overflow-hidden">

      {/* Glow decorativo superior */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-[-120px] right-[-120px]"></div>

      {/* Glow decorativo inferior */}
      <div className="absolute w-96 h-96 bg-[#163594]/40 rounded-full blur-3xl bottom-[-120px] left-[-120px]"></div>

      {/* Card */}
      <div
        className={`relative w-full max-w-md p-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
        transform transition-all duration-700 animate-float ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Bienvenido
        </h1>

        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm text-white mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 
              border border-white/30 focus:outline-none 
              focus:ring-2 focus:ring-white focus:shadow-lg 
              transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-white mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 
              border border-white/30 focus:outline-none 
              focus:ring-2 focus:ring-white focus:shadow-lg 
              transition-all duration-300"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white text-[#001f3d] font-semibold 
            transition-all duration-300 hover:scale-[1.03] 
            hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          >
            Ingresar
          </button>

          {/* Extra link */}
          <p className="text-center text-white/70 text-sm mt-4 hover:text-white transition cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>

        </form>
      </div>
    </main>
  );
}
