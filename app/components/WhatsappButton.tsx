"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚫 Ocultar en login
  if (pathname === "/login") return null;

  const phoneNumber = "+541164129888";
  const message = encodeURIComponent(
    "Hola 👋 quiero recibir información sobre sus seguros."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      className={`fixed bottom-6 right-6 z-50 
        w-14 h-14 md:w-16 md:h-16 
        flex items-center justify-center 
        rounded-full bg-[#25D366] text-white text-2xl md:text-3xl
        shadow-lg
        transition-all duration-500
        hover:scale-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      <FaWhatsapp />
    </a>
  );
}
