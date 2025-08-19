import { DashboardStats } from "../types/dashboard.types";
import { getTransactions } from "../../transactions/services/transactions.services";
import { isSuccessfulStatus, TransactionStatus } from "../../transactions/types/transactions.types";
import { getUserContext } from "../../../utils/userContext";

class DashboardService {
    async getDashboardStats(): Promise<DashboardStats> {
        try {
            const { branchIdRaw, isOrganizationLevel } = getUserContext();
            const transactions = await getTransactions(isOrganizationLevel ? null : branchIdRaw || undefined);

            // Calculamos las estadísticas aquí mismo
            const completedTransactions = transactions.filter(t => isSuccessfulStatus(t.status));
            const pendingTransactions = transactions.filter(t => t.status === TransactionStatus.PENDING);
            const failedTransactions = transactions.filter(t => t.status === TransactionStatus.FAILED);

            const totalAmount = transactions.reduce((sum, transaction) => {
                return sum + parseFloat(transaction.amount);
            }, 0);

            const totalCompletedAmount = completedTransactions.reduce((sum, transaction) => {
                return sum + parseFloat(transaction.amount);
            }, 0);

            const totalPendingAmount = pendingTransactions.reduce((sum, transaction) => {
                return sum + parseFloat(transaction.amount);
            }, 0);

            // Calcular método de pago más usado
            const paymentMethodCounts = new Map<string, number>();
            transactions.forEach(transaction => {
                const method = transaction.payment?.paymentMethod || 'N/A';
                paymentMethodCounts.set(method, (paymentMethodCounts.get(method) || 0) + 1);
            });

            let mostUsedMethod = 'N/A';
            let maxCount = 0;
            paymentMethodCounts.forEach((count, method) => {
                if (count > maxCount) {
                    maxCount = count;
                    mostUsedMethod = method;
                }
            });

            const mostUsedPaymentMethod = {
                method: mostUsedMethod,
                count: maxCount,
                percentage: transactions.length > 0 ? Math.round((maxCount / transactions.length) * 100) : 0
            };

            const stats = {
                totalTransactions: transactions.length,
                totalAmount: totalAmount,
                totalPayments: completedTransactions.length,
                totalPendingPayments: pendingTransactions.length,
                totalSuccessfulAmount: totalCompletedAmount,
                totalPendingAmount: totalPendingAmount,
                totalFailedPayments: failedTransactions.length,
                mostUsedPaymentMethod,
                recentTransactions: transactions.slice(0, 5),
                allTransactions: transactions
            };

            return stats;
        } catch (error) {
            throw new Error(`Error al cargar las estadísticas del dashboard: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    async getRecentTransactions(limit: number = 5) {
        try {
            // Aplicar el mismo filtrado
            const { isOrganizationLevel, branchId } = getUserContext();
            const filterBranchId = isOrganizationLevel ? null : branchId;

            const transactions = await getTransactions(filterBranchId);
            return transactions.slice(0, limit);
        } catch (error) {
            throw error;
        }
    }
}

export const dashboardService = new DashboardService();
