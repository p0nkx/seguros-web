"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsappButtonProps {
  phone?: string;
  message?: string;
  isFloating?: boolean; 
}

export default function WhatsappButton({ 
  phone = "+541164129888", 
  message = "Hola 👋 quiero recibir información sobre sus seguros.",
  isFloating = true 
}: WhatsappButtonProps) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isFloating) {
      setVisible(true); // Los botones de las tarjetas siempre son visibles
      return;
    }

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFloating]);

  // --- LA SOLUCIÓN AL PREDICAMENTO ---
  // Solo aplicamos la restricción de ruta si el botón es el FLOATING (el global)
  if (isFloating) {
    const rutasProhibidas = ["/login", "/register", "/clientes"]; // Agrega aquí "/clientes"
    if (rutasProhibidas.includes(pathname)) {
      return null;
    }
  }

  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(message);

  const baseStyles = "flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]";
  
  const floatingStyles = `fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 text-2xl md:text-3xl ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
  }`;

  const inlineStyles = "w-10 h-10 text-xl cursor-pointer"; 

  return (
    <a
      href={`https://wa.me/${cleanPhone.startsWith('54') ? '' : '54'}${cleanPhone}?text=${encodedMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${isFloating ? floatingStyles : inlineStyles}`}
    >
      <FaWhatsapp />
    </a>
  );
}