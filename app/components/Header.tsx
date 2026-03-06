//app/components/header.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../src/store/useAuthStore";
import { useRouter } from "next/navigation";




export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


  // Cambia a 'true' cuando quieras habilitar el sistema de usuarios en producción
  const ENABLE_USER_SYSTEM = false;


  const { isAuthenticated, logout, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
   // 1. Limpiamos el estado global
    logout();

    // 2. Borramos las cookies explícitamente
    document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 3. Forzamos recarga completa al inicio
    // Esto es más efectivo que router.push para romper la sesión
    window.location.href = "/";
  };


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || pathname === "/cotizacion" || pathname === "/clientes" || pathname === "/usuarios"
        ? "bg-[#001f3d]/95 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-5"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            //src={scrolled ? "/logo-blanco-cuadrado.svg" : "/logo-oscuro-cuadrado.svg"}
            src="/logo-blanco-cuadrado.svg"
            alt="Seguros NAG"
            className="h-12 md:h-15 w-auto drop-shadow-lg transition-all duration-300"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">

          <li>
            <Link
              href="/#inicio"
              className="text-white hover:text-[#163594] transition-colors duration-300"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              href="/#servicios"
              className="text-white hover:text-[#163594] transition-colors duration-300"
            >
              Servicios
            </Link>
          </li>

          <li>
            <Link
              href="/#planes"
              className="text-white hover:text-[#163594] transition-colors duration-300"
            >
              Planes
            </Link>
          </li>

          <li>
            <Link
              href="/#contacto"
              className="text-white hover:text-[#163594] transition-colors duration-300"
            >
              Contacto
            </Link>
          </li>

          {isAuthenticated && (
            <>
              {/* Este lo ven todos los usuarios logueados */}
              <li>
                <Link href="/clientes" className="text-white hover:text-[#163594] transition-colors duration-300">
                  Clientes
                </Link>
              </li>

              {/* Este solo lo ven los usuarios logueados QUE ADEMÁS sean admin */}
              {role === 'admin' && (
                <li>
                  <Link href="/usuarios" className="text-white hover:text-[#163594] transition-colors duration-300">
                    Usuarios
                  </Link>
                </li>
              )}
            </>
          )}

          {/* Botón Ingresar o Salir */}
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 text-slate-400 hover:text-red-400 transition-colors group"
                title="Cerrar Sesión"
              >
                <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Salir</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </button>
            ) : (
              ENABLE_USER_SYSTEM && (
              <Link
                href="/login"
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="Ingresar al sistema"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
              </Link>
              )
            )}
          </li>

        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-[#001f3d] text-white px-6 py-6 space-y-4 font-medium">

          <a
            href="#inicio"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#163594] transition-colors duration-300"
          >
            Inicio
          </a>

          <a
            href="#servicios"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#163594] transition-colors duration-300"
          >
            Servicios
          </a>

          <a
            href="#planes"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#163594] transition-colors duration-300"
          >
            Planes
          </a>

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#163594] transition-colors duration-300"
          >
            Contacto
          </a>

          {isAuthenticated && (
            <a
              href="/clientes"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#163594] px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-all duration-300"
            >
              Clientes
            </a>
          )}

          {/* Botón Ingresar o Salir */}
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                Salir
              </button>
            ) : (
              <Link href="/login" className="bg-white text-[#001f3d] px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">
                Ingresar
              </Link>
            )}
          </li>

        </div>
      </div>

    </header>
  );
}

