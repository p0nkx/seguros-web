"use client";
import { useState, useEffect } from "react";
import { registrarUsuario } from "../login/authActions";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../src/store/useAuthStore";

export default function RegistroPage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { role, isAuthenticated } = useAuthStore();

  // 1. Evitamos errores de hidratación (Zustand necesita cargarse en el cliente)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 2. Protección de Ruta: Si no es admin, lo mandamos al login o clientes
  if (!isAuthenticated || role !== 'admin') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#001f3d] text-white">
        <div className="text-center p-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          <h2 className="text-xl font-bold">Acceso Denegado</h2>
          <p className="text-white/60 mt-2">No tienes permisos para crear usuarios.</p>
          <button 
            onClick={() => router.push("/clientes")}
            className="mt-6 px-6 py-2 bg-white text-[#001f3d] rounded-lg font-bold"
          >
            Volver al Panel
          </button>
        </div>
      </main>
    );
  }

  const handleAction = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    
    const res = await registrarUsuario(formData);
    
    if (res.success) {
      alert("¡Usuario creado con éxito!");
      router.push("/clientes");
    } else {
      setError(res.error || "Error al crear usuario");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001f3d] to-[#163594] px-6 overflow-hidden">
      
      {/* Decoración igual al Login */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-[-120px] right-[-120px]"></div>

      <div className="relative w-full max-w-md p-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Nuevo Usuario</h1>

        <form action={handleAction} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm text-white mb-1 ml-1">Nombre Completo</label>
            <input name="nombre" placeholder="Ej: Juan Pérez" className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all" required />
          </div>

          <div>
            <label className="block text-sm text-white mb-1 ml-1">Email Corporativo</label>
            <input name="email" type="email" placeholder="correo@seguros.com" className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all" required />
          </div>

          <div>
            <label className="block text-sm text-white mb-1 ml-1">Nombre de Usuario (Nick)</label>
            <input name="username" placeholder="juanperez" className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all" required />
          </div>

          <div>
            <label className="block text-sm text-white mb-1 ml-1">Contraseña Temporal</label>
            <input name="password" type="password" placeholder="********" className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all" required />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg bg-white text-[#001f3d] font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Registrando..." : "Crear Usuario"}
          </button>

          <p 
            onClick={() => router.push("/clientes")}
            className="text-center text-white/50 text-sm mt-4 hover:text-white cursor-pointer transition"
          >
            Cancelar y volver
          </p>
        </form>
      </div>
    </main>
  );
}