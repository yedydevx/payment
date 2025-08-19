import { api } from '../../../config/axios';
import { Transaction } from '../types/transactions.types';
import { getUserContext } from '../../../utils/userContext';

// Función para obtener todas las transacciones del backend
export const getTransactions = async (branchId?: number | null): Promise<Transaction[]> => {
    try {
        // 1) Obtener transacciones crudas (si se pasa branchId, intentamos que el backend ya filtre)
        let url = '/transactions';
        if (typeof branchId === 'number') {
            const qs = new URLSearchParams({ branchId: String(branchId) }).toString();
            url += `?${qs}`;
        }
        const response = await api.get(url);
        let transactions: Transaction[] = response.data || [];

        // 2) Aplicar filtrado en frontend si el usuario es de sucursal
        const { isOrganizationLevel, isBranchLevel, branchId: userBranchId } = getUserContext();

        if ((isBranchLevel && userBranchId) || typeof branchId === 'number') {
            try {
                // Endpoint /branches responde distinto según rol:
                // - ADMIN/SUPER_ADMIN: array de sucursales
                // - BRANCH_ADMIN: objeto de una sucursal
                const branchesResp = await api.get('/branches');
                const payload = branchesResp.data;

                // Normalizar a array de sucursales
                const branches = Array.isArray(payload) ? payload : [payload];

                // Buscar la sucursal del usuario y obtener sus cuentas de pago
                const effectiveBranchId = typeof branchId === 'number' ? branchId : userBranchId;
                const myBranch = branches.find((b: any) => b?.id === effectiveBranchId);
                const paymentAccounts: any[] = (myBranch?.paymentAccounts || []) as any[];
                const branchUsers: any[] = (myBranch?.users || []) as any[];
                const allowedAccountIds = new Set<number>(paymentAccounts.map((pa: any) => pa?.id).filter((x: any) => typeof x === 'number'));
                const allowedUserIds = new Set<number>(branchUsers.map((u: any) => u?.id).filter((x: any) => typeof x === 'number'));

                // Filtrar las transacciones por cuenta de pago de la sucursal
                transactions = transactions.filter((t: any) => {
                    const accountId = t?.payment?.paymentAccount?.id as number | undefined;
                    const creatorId = t?.createdBy?.id as number | undefined;
                    const byAccount = typeof accountId === 'number' && allowedAccountIds.has(accountId);
                    const byCreator = typeof creatorId === 'number' && allowedUserIds.has(creatorId);
                    return byAccount || byCreator;
                });
            } catch (e) {
                console.warn('⚠️ No fue posible obtener paymentAccounts de la sucursal. Se muestran todas las transacciones.', e);
            }
        } else if (isOrganizationLevel) {
            console.log('🏢 Usuario a nivel organización: no se aplica filtro en frontend');
        }
        return transactions;
    } catch (error) {
        console.error('❌ Transactions Service Error:', error);

        // Proporcionar más detalles sobre el error
        if (error instanceof Error) {
            throw new Error(`Error al obtener transacciones: ${error.message}`);
        } else {
            throw new Error('Error desconocido al obtener transacciones');
        }
    }
};
