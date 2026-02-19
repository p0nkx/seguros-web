import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6">

                {/* Grid principal */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    {/* Marca / Descripción */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Seguros NAG
                        </h2>

                        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                            Protegemos lo que más te importa.
                            Soluciones en seguros para autos, motos, hogar y personas, con atención personalizada y el respaldo de aseguradoras de primera línea.
                        </p>

                        <p className="text-gray-500 text-xs mt-4">
                            Productora Asesora de Seguros matriculada.
                        </p>
                    </div>

                    {/* Navegación */}
                        <div>
                            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
                                Navegación
                            </h3>

                            <ul className="
                                                space-y-3 
                                                text-sm 
                                                text-gray-400 
                                                [&_a]:transition-colors 
                                                [&_a]:duration-300 
                                                [&_a:hover]:text-[#163594]
                                            ">
                                <li><a href="#inicio">Inicio</a></li>
                                <li><a href="#servicios">Servicios</a></li>
                                <li><a href="#planes">Planes</a></li>
                                <li><a href="#contacto">Contacto</a></li>
                            </ul>
                        </div>


                    {/* Información de contacto */}
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
                            Contacto
                        </h3>

                        <p className="text-sm text-gray-400 leading-relaxed">
                            Del Viso<br />
                            Buenos Aires, Argentina<br />
                            +54 11 6412 9888<br />
                            estudiojuridiconagasoc@gmail.com
                        </p>
                    </div>

                    {/* Redes sociales */}
                    <div>
                        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4">
                            Síguenos
                        </h3>

                        <div className="flex gap-4 mt-2">

                            <a
                                href="https://www.instagram.com/estudio_nag/"
                                target="_blank"
                                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white/10 hover:bg-[#E1306C] transition-all duration-300"
                            >
                                <FaInstagram className="text-white text-lg" />
                            </a>

                            <a
                                href="https://www.facebook.com/share/1HTBwqNdy5/"
                                target="_blank"
                                className="w-10 h-10 flex items-center justify-center rounded-full 
                bg-white/10 hover:bg-[#1877F2] transition-all duration-300"
                            >
                                <FaFacebookF className="text-white text-lg" />
                            </a>

                        </div>
                    </div>

                </div>

                {/* Línea inferior */}
                <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
                    © {currentYear} Seguros NAG. Todos los derechos reservados.
                </div>

            </div>
        </footer>
    );
}
