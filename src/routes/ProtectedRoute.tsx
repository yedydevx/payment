import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedRouteProps } from '@/types/routes/route.type';
import { useRolePermissions } from '@/hooks/useRolePermissions';

const ProtectedRoute = ({
    children,
    requiredRoles = [],
    requireAllRoles = false,
}: ProtectedRouteProps) => {

    const { isAuthenticated, token, getDecryptedUser } = useAuthStore();
    const { hasAnyRole, hasAllRoles } = useRolePermissions();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // damos tiempo para que el estado se hidrate
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Mostrar nada mientras se carga el estado
    if (isLoading) {
        return null;
    }

    // Verificación inmediata de autenticación
    if (!isAuthenticated || !token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Verificación adicional del usuario desencriptado
    const decryptedUser = getDecryptedUser();
    if (!decryptedUser) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // Verificar roles si se especifican
    if (requiredRoles.length > 0) {
        const hasRequiredRoles = requireAllRoles
            ? hasAllRoles(requiredRoles)
            : hasAnyRole(requiredRoles);

        if (!hasRequiredRoles) {
            console.warn(`Acceso denegado. Usuario con roles: ${decryptedUser?.roles?.join(', ')} no tiene los roles requeridos: ${requiredRoles.join(', ')}`);
            return <Navigate to="/dashboard" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
