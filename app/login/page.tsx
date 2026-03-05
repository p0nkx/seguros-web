//app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../src/store/useAuthStore"; // Importamos el store
import { useRouter } from "next/navigation"; // Para redirigir después del login
import { validarLogin } from "./authActions"; // Nueva función para validar contra la DB


export default function LoginPage() {
  const [loaded, setLoaded] = useState(false);
  const [identificador, setIdentificador] = useState(""); // Nuevo: para capturar email o nombre de usuario
  const [password, setPassword] = useState(""); // Nuevo: para capturar password
  const login = useAuthStore((state) => state.login); // Obtenemos la función de login del store
  const router = useRouter(); // Para redirigir después del login

  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setLoaded(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null); // Limpiamos errores previos

    // LLAMADA A LA BASE DE DATOS
    const resultado = await validarLogin(identificador, password);

    if (resultado.success && resultado.user) {
      login(resultado.user.role || "user"); // Guardamos el rol del usuario en Zustand
      document.cookie = "auth-session=true; path=/; max-age=86400; SameSite=Lax";
      router.push("/clientes");
    } else {
      
      setError(resultado.message || "Credenciales incorrectas");
    }
  };


  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001f3d] to-[#163594] px-6 overflow-hidden">

      {/* Glow decorativo superior */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-[-120px] right-[-120px]"></div>

      {/* Glow decorativo inferior */}
      <div className="absolute w-96 h-96 bg-[#163594]/40 rounded-full blur-3xl bottom-[-120px] left-[-120px]"></div>

      {/* Card */}
      <div
        className={`relative w-full max-w-md p-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl 
        transform transition-all duration-700 animate-float ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Bienvenido
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>


          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center animate-in fade-in duration-300">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm text-white mb-2">
              Email
            </label>
            <input
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              placeholder="correo@ejemplo.com o nombre de usuario"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
