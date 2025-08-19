import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { ModulesProps } from '../types/layout.type';
import { useNavigate } from 'react-router-dom';

export const LayoutModules = ({ active, handleActive, id, name, icon, subMenu }: ModulesProps) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [wasManuallyClosed, setWasManuallyClosed] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Detectar si estamos en modo tablet
    useEffect(() => {
        const checkTablet = () => {
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        checkTablet();
        window.addEventListener('resize', checkTablet);

        return () => window.removeEventListener('resize', checkTablet);
    }, []);

    const isCurrentItemActive = active === id;

    // Verificar si algún submódulo está activo para abrir automáticamente el menú
    const hasActiveSubModule = subMenu?.some(subItem => active === subItem.id);

    // Abrir automáticamente si hay un submódulo activo (solo cuando se navega, no cuando se cierra manualmente)
    useEffect(() => {
        if (hasActiveSubModule && !isSubMenuOpen && !wasManuallyClosed) {
            setIsSubMenuOpen(true);
            setWasManuallyClosed(false); // Reset del estado manual
        }
    }, [hasActiveSubModule, wasManuallyClosed]);

            const handleClick = () => {
        // En tablet: abrir dropdown para submódulos
        if (isTablet && subMenu) {
            setIsDropdownOpen(!isDropdownOpen);
            return;
        }

        // En móvil y desktop: comportamiento normal
        if (subMenu) {
            const newState = !isSubMenuOpen;
            setIsSubMenuOpen(newState);

            // Si el usuario está cerrando manualmente, marcar como tal
            if (!newState) {
                setWasManuallyClosed(true);
            } else {
                setWasManuallyClosed(false);
            }
        } else {
            handleActive(id);
            navigate(`/${name.toLowerCase()}`);
        }
    };

    const handleSubMenuClick = (subItem: any) => {
        handleActive(subItem.id);
        navigate(subItem.path);
    };

    return (
        <div className="w-full relative">
            {/* Módulo principal - siempre visible */}
            <div
                onClick={handleClick}
                className={`group flex items-center gap-3 p-2 md:p-3 rounded-full md:rounded-2xl cursor-pointer transition-all duration-200 justify-center text-lg ${
                    isCurrentItemActive
                        ? 'bg-[#b9f09e] text-[#2d524d] shadow-sm'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                }`}
            >
                {/* Icono del módulo */}
                <div className={`flex-shrink-0 transition-all duration-200 flex items-center justify-center ${
                    isCurrentItemActive
                        ? 'text-[#2d524d]'
                        : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                    <div className="w-7 h-7 flex items-center justify-center">
                        {icon}
                    </div>
                </div>

                {/* Nombre del módulo - solo visible en móvil y desktop */}
                <span className={`font-medium text-sm transition-colors duration-200 flex-1 md:hidden lg:block ${
                    isCurrentItemActive ? 'text-[#2d524d]' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                    {name}
                </span>

                {subMenu && (
                    <ChevronRight
                        size={18}
                        className={`flex-shrink-0 transition-all duration-200 md:hidden lg:block ${
                            isSubMenuOpen ? 'rotate-90 text-[#2d524d]' : 'rotate-0 text-gray-400 group-hover:text-gray-600'
                        }`}
                    />
                )}

                {/* Indicador de dropdown solo en tablet */}
                {subMenu && isTablet && (
                    <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-gray-600"></div>
                )}
            </div>

                                    {/* Dropdown para submódulos en modo tablet */}
            {subMenu && isTablet && isDropdownOpen && (
                <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[200px]">
                    {/* Header del dropdown */}
                    <div className="bg-gray-800 text-white px-3 py-2 rounded-t-lg flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center text-white">
                            {icon}
                        </div>
                        <span className="text-sm font-medium">{name}</span>
                    </div>

                    {/* Contenido del dropdown */}
                    <div className="p-2">
                        {subMenu.map((subItem) => (
                            <div
                                key={subItem.id}
                                onClick={() => handleSubMenuClick(subItem)}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                            >
                                {/* Icono del submódulo */}
                                <div className="w-4 h-4 flex items-center justify-center text-gray-600">
                                    {subItem.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-700">{subItem.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Submódulos - visible en móvil y desktop, no en tablet */}
            {subMenu && isSubMenuOpen && (
                <div className="ml-6 mt-2 space-y-1 md:hidden lg:block">
                    {subMenu.map((subItem) => (
                        <div
                            key={subItem.id}
                            onClick={() => handleSubMenuClick(subItem)}
                            className={`group flex items-center gap-3 p-2 md:p-3 rounded-full md:rounded-2xl cursor-pointer transition-all duration-200 justify-center text-lg ${
                                active === subItem.id
                                    ? 'bg-[#b9f09e] text-[#2d524d] shadow-sm'
                                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                            }`}
                        >
                            {/* Icono del submódulo */}
                            <div className={`flex-shrink-0 transition-all duration-200 flex items-center justify-center ${
                                active === subItem.id
                                    ? 'text-[#2d524d]'
                                    : 'text-gray-600 group-hover:text-gray-700'
                            }`}>
                                <div className="w-5 h-5 flex items-center justify-center">
                                    {subItem.icon}
                                </div>
                            </div>

                            <span className={`font-medium text-sm transition-colors duration-200 flex-1 md:hidden lg:block ${
                                active === subItem.id ? 'text-[#2d524d]' : 'text-gray-700 group-hover:text-gray-900'
                            }`}>
                                {subItem.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

