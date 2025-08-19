import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const LayoutFooter: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-6 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Sección izquierda - Copyright */}
                <div className="text-gray-700 font-medium">
                    Copyright © 2024 Peterdraw
                </div>

                {/* Sección central - Enlaces de navegación */}
                <div className="flex items-center space-x-6 text-gray-500">
                    <a href="#" className="hover:text-gray-700 transition-colors duration-200">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-gray-700 transition-colors duration-200">
                        Term and conditions
                    </a>
                    <a href="#" className="hover:text-gray-700 transition-colors duration-200">
                        Contact
                    </a>
                </div>

                {/* Sección derecha - Iconos de redes sociales */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <Youtube className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default LayoutFooter;
