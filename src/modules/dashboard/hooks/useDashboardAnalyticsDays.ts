import { DashboardProps } from "../types/dashboard.types";
import { isSuccessfulStatus } from "@/modules/transactions/types/transactions.types";

export const useDashboardAnalyticsDays = ({
    transactions,
}: DashboardProps) => {
    // Función para calcular el total de ingresos del mes
    const getLastMonthIncome = () => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const monthTransactions = transactions.filter(t =>
            isSuccessfulStatus(t.status) &&
            new Date(t.createdAt) >= firstDayOfMonth
        );

        if (monthTransactions.length === 0) return { amount: 0, count: 0 };

        const totalAmount = monthTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

        return {
            amount: totalAmount,
            count: monthTransactions.length
        };
    };

    // Función para calcular el total de ingresos de los últimos 15 días
    const getLast15DaysIncome = () => {
        const now = new Date();
        const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);

        const fifteenDaysTransactions = transactions.filter(t =>
            isSuccessfulStatus(t.status) &&
            new Date(t.createdAt) >= fifteenDaysAgo
        );

        if (fifteenDaysTransactions.length === 0) return { amount: 0, count: 0 };

        const totalAmount = fifteenDaysTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

        return {
            amount: totalAmount,
            count: fifteenDaysTransactions.length
        };
    };

    // Función para calcular el total de ingresos de los últimos 5 días
    const getLast5DaysIncome = () => {
        const now = new Date();
        const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

        const fiveDaysTransactions = transactions.filter(t =>
            isSuccessfulStatus(t.status) &&
            new Date(t.createdAt) >= fiveDaysAgo
        );

        if (fiveDaysTransactions.length === 0) return { amount: 0, count: 0 };

        const totalAmount = fiveDaysTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

        return {
            amount: totalAmount,
            count: fiveDaysTransactions.length
        };
    };

    const lastMonthIncome = getLastMonthIncome();
    const last15DaysIncome = getLast15DaysIncome();
    const last5DaysIncome = getLast5DaysIncome();

    return {
        lastMonthIncome,
        last15DaysIncome,
        last5DaysIncome,
        getLastMonthIncome,
        getLast15DaysIncome,
        getLast5DaysIncome
    }
}
