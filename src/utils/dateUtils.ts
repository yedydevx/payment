/**
 * Utilidades para formateo de fechas
 */

/**
 * Formatea una fecha en formato español corto
 * Ejemplo: "09 ago 2025"
 */
export const formatDateSpanish = (dateString: string | Date): string => {
    try {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

        if (isNaN(date.getTime())) {
            return 'Fecha inválida';
        }

        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
    }
};

/**
 * Formatea una fecha en formato español completo
 * Ejemplo: "9 de agosto de 2025"
 */
export const formatDateSpanishFull = (dateString: string | Date): string => {
    try {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

        if (isNaN(date.getTime())) {
            return 'Fecha inválida';
        }

        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
    }
};

/**
 * Formatea una fecha con hora en formato español
 * Ejemplo: "09 ago 2025, 14:30"
 */
export const formatDateTimeSpanish = (dateString: string | Date): string => {
    try {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

        if (isNaN(date.getTime())) {
            return 'Fecha inválida';
        }

        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
    }
};

/**
 * Obtiene la fecha relativa (hace X tiempo)
 * Ejemplo: "hace 2 días"
 */
export const getRelativeTime = (dateString: string | Date): string => {
    try {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Hoy';
        if (diffInDays === 1) return 'Ayer';
        if (diffInDays < 7) return `Hace ${diffInDays} días`;
        if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
        if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;

        return `Hace ${Math.floor(diffInDays / 365)} años`;
    } catch (error) {
        console.error('Error al calcular tiempo relativo:', error);
        return 'Fecha inválida';
    }
};

