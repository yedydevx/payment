import { Transaction, isSuccessfulStatus } from "../../transactions/types/transactions.types";

export interface CategoryExpenseData {
    category: string;
    amount: number;
    percentage: number;
    color: string;
    count: number;
}

export interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

export interface TransactionData {
  id: string;
  description: string;
  userName: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
}

export interface DashboardStats {
  totalIncome: number;
  monthlyIncome: number;
  weeklyIncome: number;
  monthlyTransactions: number;
  weeklyTransactions: number;
}

// Función para procesar datos de gastos por categoría
export const processCategoryExpenses = (transactions: Transaction[]): CategoryExpenseData[] => {
    // Agrupar por categoría de cuenta de pago
    const categoryData: { [key: string]: { amount: number; count: number } } = {};

    const successfulTransactions = transactions.filter(t => isSuccessfulStatus(t.status));
    const totalAmount = successfulTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    successfulTransactions.forEach(transaction => {
        const category = transaction.paymentAccount?.category.name || transaction.payment.paymentAccount.category.name;

        if (!categoryData[category]) {
            categoryData[category] = { amount: 0, count: 0 };
        }
        categoryData[category].amount += parseFloat(transaction.amount);
        categoryData[category].count += 1;
    });

    // Paleta de colores inspirada en el sidebar del proyecto (tonos azules y complementarios)
    const colors = [
        '#1e40af', // azul principal del sidebar
        '#3b82f6', // azul más claro
        '#1e3a8a', // azul más oscuro del sidebar
        '#6366f1', // índigo
        '#8b5cf6', // púrpura
        '#06b6d4', // cyan
        '#10b981', // esmeralda
        '#f59e0b', // amarillo
        '#ef4444', // rojo
        '#f97316', // naranja
    ];

    // Convertir a array y calcular porcentajes
    const result: CategoryExpenseData[] = Object.entries(categoryData)
        .map(([category, data], index) => ({
            category,
            amount: data.amount,
            count: data.count,
            percentage: Math.round((data.amount / totalAmount) * 100),
            color: colors[index % colors.length]
        }))
        .sort((a, b) => b.amount - a.amount); // Ordenar por monto descendente

    return result;
};

// Función para obtener transacciones agrupadas por método de pago
export const processPaymentMethods = (transactions: Transaction[]) => {
    const methodData: { [key: string]: { amount: number; count: number } } = {};

    const successfulTransactions = transactions.filter(t => isSuccessfulStatus(t.status));

    successfulTransactions.forEach(transaction => {
        const method = transaction.paymentMethod || transaction.payment.paymentMethod;

        if (!methodData[method]) {
            methodData[method] = { amount: 0, count: 0 };
        }
        methodData[method].amount += parseFloat(transaction.amount);
        methodData[method].count += 1;
    });

    return Object.entries(methodData).map(([method, data]) => ({
        method,
        amount: data.amount,
        count: data.count,
        percentage: Math.round((data.amount / successfulTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0)) * 100)
    }));
};

export const processRevenueData = (rawData: any[]): ChartData[] => {
  return rawData.map(item => ({
    month: item.month,
    revenue: item.revenue || 0,
    expenses: item.expenses || 0,
    profit: item.profit || 0
  }));
};

export const processExpenseData = (rawData: any[]): ExpenseData[] => {
  return rawData.map(item => ({
    name: item.name,
    value: item.value || 0,
    color: item.color || '#3b82f6'
  }));
};

export const processTransactionData = (rawData: any[]): TransactionData[] => {
  return rawData.map(item => ({
    id: item.id,
    description: item.description,
    userName: item.userName,
    date: item.date,
    amount: item.amount || 0,
    status: item.status || 'pending'
  }));
};

export const calculateTotals = (data: any[], field: string): number => {
  return data.reduce((sum, item) => sum + (item[field] || 0), 0);
};

export const getMonthlyGrowth = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
