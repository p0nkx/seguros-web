"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
  scrolled || pathname === "/cotizacion"
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

          {/* <li>
            <a
              href="/login"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? "bg-[#163594] text-white hover:bg-blue-700"
                  : "bg-white text-[#001f3d] hover:bg-gray-200"
              }`}
            >
              Ingresar
            </a>
          </li> */}

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
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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

          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block bg-[#163594] px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-all duration-300"
          >
            Ingresar
          </a>

        </div>
      </div>

    </header>
  );
}
