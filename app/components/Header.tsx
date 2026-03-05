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
    // 1. Limpiamos el estado global (Zustand)
    logout();

    // 2. Borramos la cookie para el Middleware
    document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 3. ¡IMPORTANTE! Redirigimos al inicio inmediatamente
    // Esto evita que el usuario se quede viendo los datos de clientes
    router.push("/");

    // Opcional: router.refresh() para limpiar cualquier cache del servidor
    router.refresh();


    logout(); // Limpia Zustand
    // Borra la cookie poniendo una fecha de expiración pasada
    document.cookie = "auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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

