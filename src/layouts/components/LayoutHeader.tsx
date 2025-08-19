import { useState } from 'react';
import { Menu, Bell, MessageCircle } from 'lucide-react';
import { LayoutHeaderProps } from '../types/layout.type';
import { LayoutProfile } from './LayoutProfile';
import LogoNegro from '@/assets/LogoNegro.png';

export const LayoutHeader = ({ title, onMenuClick }: LayoutHeaderProps) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="w-full h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 relative z-40">
            {/* Lado izquierdo - Botón de menú y logo */}
            <div className="flex items-center gap-4">
                {/* Botón de menú - solo visible en móvil y tablet */}
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>

                {/* Logo - solo visible en móvil y tablet */}
                <div className="flex items-center gap-3 lg:hidden">
                    <img src={LogoNegro} alt="logo" className="w-24 h-14 object-contain" />
                </div>

                {/* Título - visible en tablet y desktop */}
                <h1 className="hidden md:block text-xl font-bold text-gray-900">{title}</h1>
            </div>

            {/* Lado derecho - Notificaciones y perfil */}
            <div className="flex items-center gap-3">
                {/* Iconos de notificaciones */}
                <div className="flex items-center gap-2">
                    {/* Mensajes */}
                    <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group">
                        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        {/* Indicador de notificación */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    </button>

                    {/* Notificaciones */}
                    <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group">
                        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Bell className="w-4 h-4 text-white" />
                        </div>
                        {/* Indicador de notificación */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    </button>
                </div>

                {/* Separador */}
                <div className="w-px h-8 bg-gray-200"></div>

                {/* Perfil del usuario */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <LayoutProfile />
                    </button>

                    {/* Dropdown del perfil */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            {/* Header del perfil */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <LayoutProfile />
                                    <div>
                                        <p className="font-semibold text-gray-900">John Doe</p>
                                        <p className="text-sm text-gray-600">john.doe@example.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Opciones del perfil */}
                            <div className="p-2">
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    Mi Perfil
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    Configuración
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    Ayuda
                                </button>
                            </div>

                            {/* Separador */}
                            <div className="border-t border-gray-200"></div>

                            {/* Cerrar sesión */}
                            <div className="p-2">
                                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
