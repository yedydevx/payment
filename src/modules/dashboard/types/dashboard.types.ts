import { Transaction } from "@/modules/transactions/types/transactions.types";

export interface DashboardProps {
    transactions: Transaction[];
    formatCurrency?: (amount: number) => string;
    className?: string;
}


export interface CategoryData {
    method: string;
    count: number;
    percentage: number;
    color: string;
}

export interface DashboardTransactionTotalProps {
    totalSuccessfulAmount: number;
    totalTransactions: number;
    totalSuccessfulPayments: number;
    totalPendingPayments: number;
    totalFailedPayments: number;
    formatCurrency: (amount: number) => string;
    recentTransactions: Transaction[];
    getStatusText: (status: string) => string;
}

export interface ChartDataPoint {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

export interface DashboardStats {
    totalTransactions: number;
    totalAmount: number;
    totalPayments: number;
    totalPendingPayments: number;
    totalSuccessfulAmount: number;
    totalPendingAmount: number;
    totalFailedPayments: number;
    mostUsedPaymentMethod: {
        method: string;
        count: number;
        percentage: number;
    };
    recentTransactions: Transaction[];
    allTransactions: Transaction[];
}
