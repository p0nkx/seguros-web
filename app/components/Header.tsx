"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
        scrolled
          ? "bg-[#001f3d]/90 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <div
          className={`text-2xl font-bold transition-colors duration-300 ${
            scrolled ? "text-white" : "text-white"
          }`}
        >
          <a href="/">Seguros</a>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-8 font-medium">

          <li>
            <a
              href="#inicio"
              className={`transition-colors duration-300 ${
                scrolled
                  ? "text-white hover:text-[#163594]"
                  : "text-white hover:text-[#163594]"
              }`}
            >
              Inicio
            </a>
          </li>

          <li>
            <a
              href="#servicios"
              className={`transition-colors duration-300 ${
                scrolled
                  ? "text-white hover:text-[#163594]"
                  : "text-white hover:text-[#163594]"
              }`}
            >
              Servicios
            </a>
          </li>

          <li>
            <a
              href="#planes"
              className={`transition-colors duration-300 ${
                scrolled
                  ? "text-white hover:text-[#163594]"
                  : "text-white hover:text-[#163594]"
              }`}
            >
              Planes
            </a>
          </li>

          <li>
            <a
              href="#contacto"
              className={`transition-colors duration-300 ${
                scrolled
                  ? "text-white hover:text-[#163594]"
                  : "text-white hover:text-[#163594]"
              }`}
            >
              Contacto
            </a>
          </li>

          {/* Botón destacado */}
          <li>
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
          </li>

        </ul>
      </nav>
    </header>
  );
}
