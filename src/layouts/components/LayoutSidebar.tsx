import { useLogout } from "@/hooks/useLogout";
import { HiPower } from "react-icons/hi2";
import { LayoutModules } from "./LayoutModules";
import { LayoutSidebarProps } from "../types/layout.type";
import { Lock, X } from "lucide-react";

export const LayoutSidebar = ({ active, handleActive, modules, onClose }: LayoutSidebarProps) => {
    const { logout } = useLogout();

    return (
        <div className="flex flex-col w-full h-full bg-[#eef2ed] relative">
            {/* Header con logo */}
            <div className="h-14 flex items-center justify-center relative">
                {/* Botón cerrar para móvil */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute left-3 md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-[#2d524d]" />
                    </button>
                )}

                {/* Logo y contenido - visible en móvil y desktop, no en tablet */}
                <div className="flex items-center gap-3 md:hidden lg:flex">
                    {/* Logo con 4 cuadrados en grid 2x2 */}
                    <div className="grid grid-cols-2 gap-1">
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                    </div>
                    {/* Texto del logo */}
                    <div className="text-xl font-bold text-[#2d524d] tracking-wide">
                        ZetaPay
                    </div>
                </div>


            </div>

            <div className="h-full flex flex-col justify-between">
                {/* Navegación */}
                <div className="overflow-y-auto overflow-x-hidden sidebar-scroll px-2 lg:px-4">
                    <div className="w-full flex flex-col space-y-1 mt-4">
                        {modules.map((module) => (
                            <LayoutModules
                                key={module.id}
                                active={active}
                                handleActive={handleActive}
                                id={module.id}
                                name={module.name}
                                icon={module.icon}
                                subMenu={module.subMenu}
                            />
                        ))}
                    </div>
                </div>

                {/* Tarjeta promocional - visible en móvil y lg+ */}
                <div className="px-2 lg:px-4 pb-4 md:hidden lg:block">
                    <div className="bg-[#2d524d] rounded-xl p-4 text-white relative overflow-hidden mb-4">
                        {/* Elementos decorativos */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-[#b9f09e] rounded-lg flex items-center justify-center">
                            <Lock className="w-4 h-4 text-[#2d524d]" />
                        </div>
                        <div className="absolute top-1 right-2 w-6 h-6 bg-[#b9f09e]/30 rounded-full"></div>
                        <div className="absolute top-3 right-1 w-4 h-4 bg-[#b9f09e]/20 rounded-full"></div>

                        {/* Contenido */}
                        <div className="mt-8 mb-4">
                            <p className="text-sm leading-relaxed">
                                Accede a análisis detallados y gráficos de tus finanzas
                            </p>
                        </div>

                        {/* Botón Pro */}
                        <button className="w-full bg-[#b9f09e] text-[#2d524d] font-semibold py-2 px-4 rounded-lg hover:bg-[#a8e08d] transition-colors duration-200">
                            Obtener Pro
                        </button>
                    </div>


                {/* Botón de logout - mismo estilo que los módulos */}
                <div className="px-2 lg:px-4 pb-4">
                    <div
                        onClick={logout}
                        className="group flex items-center justify-center lg:justify-start gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                    >
                        <div className="text-gray-600 group-hover:text-gray-700">
                            <HiPower className="w-7 h-7" />
                        </div>
                        {/* Texto del logout - visible en móvil y lg+ */}
                        <span className="font-medium text-sm md:hidden lg:block">Cerrar Sesión</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
