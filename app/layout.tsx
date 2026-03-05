import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappButton from "./components/WhatsappButton";
import ScrollToTop from "./components/ScrollToTop";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  
  title: "Estudio NAG | Seguros y Asesoría",
  description: "Productora de seguros profesional. Cotizá tu seguro online.",
  
  // Aquí traducimos lo que te dio la web al formato de Next.js:
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  //manifest: "/site.webmanifest", //esta linea permite que la web sea una app descargable para el celular
  
  // OPCIONAL: Esto es lo que hablamos de la tarjeta de WhatsApp
  openGraph: {
    title: "Estudio NAG | Seguros",
    description: "Cotizá tu seguro online en minutos.",
    url: "https://estudio-nag.vercel.app/",
    siteName: "Estudio NAG",
    images: [
      {
        url: "/opencard.jpg", // Asegúrate de tener esta imagen también en /public
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <WhatsappButton />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
