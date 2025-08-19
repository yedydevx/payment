import { useState, useEffect } from 'react';
import { DashboardStats } from '../types/dashboard.types';
import { dashboardService } from '../services/dashboard.services';
import { isSuccessfulStatus } from '../../transactions/types/transactions.types';

export const useDashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalTransactions: 0,
        totalAmount: 0,
        totalPayments: 0,
        totalPendingPayments: 0,
        totalSuccessfulAmount: 0,
        totalPendingAmount: 0,
        totalFailedPayments: 0,
        mostUsedPaymentMethod: {
            method: 'N/A',
            count: 0,
            percentage: 0
        },
        recentTransactions: [],
        allTransactions: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardStats = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await dashboardService.getDashboardStats();
            setStats(data);
        } catch (err) {
            setError('Error al cargar las estadísticas del dashboard');
            console.error('Error fetching dashboard stats:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        if (isSuccessfulStatus(status)) {
            return 'text-green-600';
        }
        switch (status) {
            case 'PENDING':
                return 'text-yellow-600';
            case 'FAILED':
                return 'text-red-600';
            case 'CANCELLED':
                return 'text-gray-600';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusText = (status: string) => {
        if (isSuccessfulStatus(status)) {
            if (status.includes('COMPLET')) return 'Completado';
            return 'Exitoso';
        }
        switch (status) {
            case 'PENDING':
                return 'Pendiente';
            case 'FAILED':
                return 'Fallido';
            case 'CANCELLED':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const formatPaymentMethod = (method: string) => {
        switch (method) {
            case 'CREDIT_CARD':
                return 'Tarjeta de Crédito';
            case 'DEBIT_CARD':
                return 'Tarjeta de Débito';
            case 'BANK_TRANSFER':
                return 'Transferencia Bancaria';
            case 'CASH':
                return 'Efectivo';
            case 'PSE':
                return 'PSE';
            case 'N/A':
                return 'N/A';
            default:
                return method;
        }
    };

    return {
        stats,
        isLoading,
        error,
        fetchDashboardStats,
        formatCurrency,
        getStatusColor,
        getStatusText,
        formatPaymentMethod
    };
};
