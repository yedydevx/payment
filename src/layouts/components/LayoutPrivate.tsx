import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSidebar } from './LayoutSidebar';
import usePrivateLayout from '../useLayout';

export const LayoutPrivate = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const {
        active,
        handleActive,
        modules,
        title,
    } = usePrivateLayout();

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className='flex flex-row w-full h-screen bg-[#eef2ed]'>
            {/* Sidebar - responsive */}
            <div className={`fixed md:relative z-50 md:z-auto h-full transition-all duration-300 transform ${
                // Móvil
                isMobileSidebarOpen ? 'w-64 min-w-64 translate-x-0' : 'w-64 min-w-64 -translate-x-full md:translate-x-0'
            } ${
                // Tablet: 64px (solo iconos)
                'md:w-16 md:min-w-16'
            } ${
                // Desktop: 256px (completo)
                'lg:w-60 lg:min-w-60'
            }`}>
                <LayoutSidebar
                    active={active}
                    handleActive={handleActive}
                    modules={modules}
                    onClose={closeMobileSidebar}
                />
            </div>

            {/* Overlay difuminado para móvil */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={closeMobileSidebar}
                />
            )}

            {/* Contenido principal */}
            <div className='flex flex-col w-full h-full rounded-l-3xl bg-white overflow-hidden'>
                {/* Header */}
                <div className='h-16 md:px-4 lg:px-6 flex items-center flex-shrink-0'>
                    <LayoutHeader
                        title={title}
                        onMenuClick={toggleMobileSidebar}
                    />
                </div>

                {/* Contenedor del contenido con control estricto de overflow */}
                <div className='flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden min-w-0'>
                    <div className='w-full min-w-0 max-w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
