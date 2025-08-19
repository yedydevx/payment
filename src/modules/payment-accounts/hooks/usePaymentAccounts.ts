// import { useState, useEffect } from 'react';
// import { PaymentAccount } from '../types/payment.types';
// import { getPaymentAccounts } from '../services/payment-accounts.services';
// import { useRolePermissions } from '../../../hooks/useRolePermissions';

// export const usePaymentAccounts = () => {
//     const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const { isOrganizationLevel, getUserBranchId } = useRolePermissions();

//     useEffect(() => {
//         const fetchAccounts = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 // Determinar si debe filtrar por sucursal
//                 const branchId = isOrganizationLevel ? undefined : getUserBranchId();

//                 const accountsData = await getPaymentAccounts(undefined, branchId);
//                 setAccounts(accountsData);
//             } catch (error) {
//                 console.error('Error fetching payment accounts:', error);
//                 setError(error instanceof Error ? error.message : 'Error al cargar cuentas de pago');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAccounts();
//     }, [isOrganizationLevel, getUserBranchId]);

//     const refresh = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const branchId = isOrganizationLevel ? undefined : getUserBranchId();
//             const accountsData = await getPaymentAccounts(undefined, branchId);
//             setAccounts(accountsData);
//         } catch (error) {
//             console.error('Error refreshing payment accounts:', error);
//             setError(error instanceof Error ? error.message : 'Error al refrescar cuentas de pago');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return {
//         accounts,
//         loading,
//         error,
//         refresh
//     };
// };
