import { useAuthStore } from '@/store/auth.store';

/**
 * Utilidades para obtener información del contexto del usuario
 * sin usar hooks (para ser usadas en servicios)
 */

export const getUserContext = () => {
    const { getDecryptedUser, getDecryptedToken } = useAuthStore.getState();
    const user = getDecryptedUser();

    if (!user) return { isOrganizationLevel: false, branchId: null, userRoles: [] };

    // Obtener roles del usuario
    const userRoles = user.roles || [];

    // Determinar si es nivel organización o sucursal
    const organizationRoles = ['SUPER_ADMIN', 'ADMIN'];
    const branchRoles = ['BRANCH_ADMIN', 'BRANCH_USER', 'CASHIER', 'ACCOUNTANT'];

    const isOrganizationLevel = userRoles.some((role: string) => organizationRoles.includes(role));
    const isBranchLevel = userRoles.some((role: string) => branchRoles.includes(role));

    // Obtener branchId si es usuario de sucursal
    let branchId: number | null = null;
    // branchId bruto sin importar roles (útil cuando un usuario tiene ADMIN y además está asignado a una sede)
    let branchIdRaw: number | null = null;

    if (isBranchLevel && !isOrganizationLevel) {
        // Intentar obtenerlo del JWT primero
        const token = getDecryptedToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.branchId) {
                    branchId = payload.branchId;
                }
            } catch (error) {
                console.error('Error decodificando JWT para branchId:', error);
            }
        }

        // Luego intentar obtenerlo de los datos del usuario
        if (!branchId && user.branchId) {
            branchId = user.branchId;
        }
    }

    // Asignar branchIdRaw independientemente de roles
    try {
        const token = getDecryptedToken();
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.branchId) branchIdRaw = payload.branchId;
        }
    } catch {}
    if (!branchIdRaw && user?.branchId) branchIdRaw = user.branchId;

    return {
        isOrganizationLevel,
        isBranchLevel,
        branchId,
        branchIdRaw,
        userRoles
    };
};
