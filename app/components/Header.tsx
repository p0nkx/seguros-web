"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          ? "bg-[#001f3d]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <a href="/">Seguros</a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">

          <li>
            <a
              href="#inicio"
              className="text-white hover:text-[#163594] transition"
            >
              Inicio
            </a>
          </li>

          <li>
            <a
              href="#servicios"
              className="text-white hover:text-[#163594] transition"
            >
              Servicios
            </a>
          </li>

          <li>
            <a
              href="#planes"
              className="text-white hover:text-[#163594] transition"
            >
              Planes
            </a>
          </li>

          <li>
            <a
              href="#contacto"
              className="text-white hover:text-[#163594] transition"
            >
              Contacto
            </a>
          </li>

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
            className="block hover:text-[#163594] transition"
          >
            Inicio
          </a>

          <a
            href="#servicios"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#163594] transition"
          >
            Servicios
          </a>

          <a
            href="#planes"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#163594] transition"
          >
            Planes
          </a>

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#163594] transition"
          >
            Contacto
          </a>

          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block bg-[#163594] px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
          >
            Ingresar
          </a>

        </div>
      </div>

    </header>
  );
}
