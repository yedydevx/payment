import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingContainerProps {
    /** Si está cargando */
    loading: boolean;
    /** Texto a mostrar cuando está cargando */
    loadingText?: string;
    /** Contenido a mostrar cuando no está cargando */
    children: React.ReactNode;
    /** Mensaje de error */
    error?: string;
    /** Altura del contenedor */
    height?: string;
    /** Clases CSS adicionales */
    className?: string;
}

export const LoadingContainer: React.FC<LoadingContainerProps> = ({
    loading,
    loadingText = 'Cargando...',
    children,
    error,
    height = 'h-32',
    className
}) => {
    if (error) {
        return (
            <div className={cn(
                'flex items-center justify-center',
                height,
                className
            )}>
                <div className="text-black p-4 text-center border border-black rounded-md bg-gray-100">
                    <p className="text-md font-bold">Ups! Ocurrió un error: {error}</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={cn(
                'flex items-center justify-center',
                height,
                className
            )}>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"/>
                    <p className="text-lg font-semibold text-gray-800">
                        {loadingText}
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default LoadingContainer;
