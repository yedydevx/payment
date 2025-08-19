import { useMemo } from 'react';
import { ChartDataPoint } from '../types/dashboard.types';
import { Transaction, isSuccessfulStatus } from '../../transactions/types/transactions.types';

export const useDashboardSimpleRevenueChart = (transactions: Transaction[]) => {
    // Procesar datos de transacciones para el gráfico
    const chartData = useMemo(() => {
        // Agrupar transacciones exitosas por mes
        const monthlyData: { [key: string]: number } = {};

        const successfulTransactions = transactions.filter(t => isSuccessfulStatus(t.status));

        successfulTransactions.forEach(transaction => {
            const date = new Date(transaction.createdAt);
            const monthKey = date.toLocaleDateString('es-CO', { month: 'short' });

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = 0;
            }
            monthlyData[monthKey] += parseFloat(transaction.amount);
        });

        // Generar datos para los últimos 6 meses
        const now = new Date();
        const result: ChartDataPoint[] = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = date.toLocaleDateString('es-CO', { month: 'short' });
            const value = monthlyData[monthKey] || 0;

            result.push({
                name: monthKey,
                uv: value,
                pv: value,
                amt: value,
            });
        }

        // Si no hay datos, usar datos de ejemplo
        if (result.every(r => r.uv === 0)) {
            return [
                { name: 'Jul', uv: 137600, pv: 137600, amt: 137600 },
                { name: 'Ago', uv: 860000, pv: 860000, amt: 860000 },
                { name: 'Sep', uv: 103200, pv: 103200, amt: 103200 },
                { name: 'Oct', uv: 154800, pv: 154800, amt: 154800 },
                { name: 'Nov', uv: 189200, pv: 189200, amt: 189200 },
                { name: 'Dic', uv: 225000, pv: 225000, amt: 225000 },
            ];
        }

        return result;
    }, [transactions]);

    // Función para formatear moneda
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return {
        chartData,
        formatCurrency
    };
};
