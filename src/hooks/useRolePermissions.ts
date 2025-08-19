import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth.store';

/**
 * Hook para manejar permisos basados en roles del sistema
 *
 * Roles del sistema:
 * - SUPER_ADMIN: Acceso completo a todo el sistema
 * - ADMIN: Administrador de organización (puede gestionar sucursales)
 * - BRANCH_ADMIN: Administrador de sucursal específica
 * - BRANCH_USER: Usuario de sucursal específica
 * - CASHIER: Cajero de sucursal
 * - ACCOUNTANT: Contador de sucursal
 */
export const useRolePermissions = () => {
    const { getDecryptedUser, getDecryptedToken } = useAuthStore();

        const user = useMemo(() => {
        const decryptedUser = getDecryptedUser();

        // También verificar el token JWT para roles
        const token = getDecryptedToken();
        if (token && decryptedUser) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.roles && Array.isArray(payload.roles)) {
                    // Fusionar roles del user con roles del JWT
                    decryptedUser.roles = payload.roles;
                }
            } catch (error) {
                console.error('Error decodificando JWT:', error);
            }
        }

        return decryptedUser;
    }, [getDecryptedUser, getDecryptedToken]);

    const userRoles = useMemo(() => {
        return user?.roles || [];
    }, [user]);

    // Verificar si el usuario tiene un rol específico
    const hasRole = (role: string): boolean => {
        return userRoles.includes(role);
    };

    // Verificar si el usuario tiene alguno de los roles especificados
    const hasAnyRole = (roles: string[]): boolean => {
        return userRoles.some((role: string) => roles.includes(role));
    };

    // Verificar si el usuario tiene todos los roles especificados
    const hasAllRoles = (roles: string[]): boolean => {
        return roles.every(role => userRoles.includes(role));
    };

    // Roles específicos del sistema
    const isSuperAdmin = hasRole('SUPER_ADMIN');
    const isAdmin = hasRole('ADMIN');
    const isBranchAdmin = hasRole('BRANCH_ADMIN');
    const isBranchUser = hasRole('BRANCH_USER');
    const isCashier = hasRole('CASHIER');
    const isAccountant = hasRole('ACCOUNTANT');

    // Permisos de módulos específicos
    const canAccessBranches = hasAnyRole(['SUPER_ADMIN', 'ADMIN']);
    const canManageBranches = hasAnyRole(['SUPER_ADMIN', 'ADMIN']);
    const canCreateBranches = hasAnyRole(['SUPER_ADMIN', 'ADMIN']);
    const canDeleteBranches = hasAnyRole(['SUPER_ADMIN', 'ADMIN']);



    // Permisos de transacciones
    const canViewAllTransactions = hasAnyRole(['SUPER_ADMIN', 'ADMIN']);
    const canCreateTransactions = hasAnyRole(['SUPER_ADMIN', 'ADMIN', 'BRANCH_ADMIN', 'BRANCH_USER', 'CASHIER']);
    const canManageTransactions = hasAnyRole(['SUPER_ADMIN', 'ADMIN', 'BRANCH_ADMIN']);

    // Información del contexto del usuario
    const isOrganizationLevel = hasAnyRole(['SUPER_ADMIN', 'ADMIN']);
    const isBranchLevel = hasAnyRole(['BRANCH_ADMIN', 'BRANCH_USER', 'CASHIER', 'ACCOUNTANT']);

    // Obtener branchId del usuario (desde JWT o datos del usuario)
    const getUserBranchId = (): number | null => {
        if (!user) return null;

        // Primero intentar obtenerlo del JWT
        const token = getDecryptedToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.branchId) {
                    return payload.branchId;
                }
            } catch (error) {
                console.error('Error decodificando JWT para branchId:', error);
            }
        }

        // Luego intentar obtenerlo de los datos del usuario
        return user.branchId || null;
    };

    return {
        // Información del usuario
        user,
        userRoles,

        // Funciones de verificación
        hasRole,
        hasAnyRole,
        hasAllRoles,

        // Roles específicos
        isSuperAdmin,
        isAdmin,
        isBranchAdmin,
        isBranchUser,
        isCashier,
        isAccountant,

        // Permisos de módulos
        canAccessBranches,
        canManageBranches,
        canCreateBranches,
        canDeleteBranches,

        // Permisos de transacciones
        canViewAllTransactions,
        canCreateTransactions,
        canManageTransactions,

        // Contexto del usuario
        isOrganizationLevel,
        isBranchLevel,
        getUserBranchId,
    };
};
