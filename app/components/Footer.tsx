import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Sobre Nosotros</h3>
                        <p className="text-gray-400">
                            Somos una empresa dedicada a proporcionar soluciones de calidad a nuestros clientes.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Inicio</a></li>
                            <li><a href="#" className="hover:text-white">Servicios</a></li>
                            <li><a href="#" className="hover:text-white">Contacto</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contacto</h3>
                        <p className="text-gray-400">
                            Email: info@example.com<br />
                            Teléfono: +34 123 456 789<br />
                            Dirección: Calle Principal, 123
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; {currentYear} Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}