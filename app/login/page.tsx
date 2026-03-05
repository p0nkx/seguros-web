//app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../src/store/useAuthStore"; // Importamos el store
import { useRouter } from "next/navigation"; // Para redirigir después del login

export default function LoginPage() {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState(""); // Nuevo: para capturar email
  const [password, setPassword] = useState(""); // Nuevo: para capturar password
  const login = useAuthStore((state) => state.login); // Obtenemos la función de login del store
  const router = useRouter(); // Para redirigir después del login

  useEffect(() => { setLoaded(true); }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@seguros.com" && password === "contraseña2026") {
      // 1. Guardamos en el store (para el Header y UI)
      login();

      // 2. CREAMOS LA COOKIE (la "llave" para el middleware)
      // Esto crea una cookie llamada 'auth-session' que dura 1 día
      document.cookie = "auth-session=true; path=/; max-age=86400; SameSite=Lax";

      router.push("/clientes");
    } else {
      alert("Error");
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

          {/* Email */}
          <div>
            <label className="block text-sm text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
