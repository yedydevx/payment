import React from 'react';
import { useNavigate } from "react-router-dom";
import { isSuccessfulStatus } from "@/modules/transactions/types/transactions.types";

interface DashboardRecentTransactionsProps {
    transactions: any[];
    formatCurrency: (amount: number) => string;
    getStatusText: (status: string) => string;
}

export const DashboardRecentTransactions: React.FC<DashboardRecentTransactionsProps> = ({
    transactions,
    formatCurrency,
    getStatusText
}) => {
    const navigate = useNavigate();

    // Función helper para mapear métodos de pago
    const getPaymentMethodLabel = (method: string) => {
        const methodConfig: Record<string, string> = {
            CREDIT_CARD: 'Tarjeta Crédito',
            DEBIT_CARD: 'Tarjeta Débito',
            BANK_TRANSFER: 'Transferencia',
            PSE: 'PSE',
            CASH: 'Efectivo',
        };
        return methodConfig[method] || method;
    };

    return (
        <div className="mt-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between p-3 border-b border-gray-100">
                    <h3 className="text-gray-800 text-sm font-bold">Transacciones Recientes</h3>
                    <button
                        onClick={() => navigate('/transactions')}
                        className="text-[#1e40af] hover:text-[#1e3a8a] font-medium text-xs transition-colors cursor-pointer"
                    >
                        Ver todas
                    </button>
                </div>
                <div className="p-3">
                    {transactions.length > 0 ? (
                        <div className="space-y-3 overflow-y-auto max-h-80 pr-2">
                            {transactions.slice(0, 8).map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300"
                                >
                                    {/* Header de la tarjeta */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">💳</span>
                                            <span className="text-gray-800 text-sm font-bold">
                                                {transaction.payment?.paymentAccount?.category?.name || 'Sin categoría'}
                                            </span>
                                        </div>
                                        <span className="text-blue-600 text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 border border-blue-200">
                                            {getPaymentMethodLabel(transaction.payment?.paymentMethod || 'N/A')}
                                        </span>
                                    </div>

                                    {/* Información del titular */}
                                    <div className="mb-3">
                                        <div className="text-gray-800 text-base font-bold mb-1">
                                            {transaction.payment?.payerName || 'Sin nombre'}
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {transaction.payment?.payerDocument || 'Sin documento'}
                                        </div>
                                    </div>

                                    {/* Información financiera */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="text-gray-800 text-lg font-black">
                                            {formatCurrency(parseFloat(transaction.amount))}
                                        </div>
                                        <div className="text-right flex items-center gap-1">
                                            <div className="text-gray-500 text-xs mb-1">Comisión:</div>
                                            <div className="text-gray-800 text-sm font-semibold">
                                                {transaction.commission
                                                    ? formatCurrency(transaction.commission)
                                                    : 'Sin comisión'
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Estado de la transacción */}
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                                        <div className="">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                                isSuccessfulStatus(transaction.status) ? 'bg-green-500 text-white' :
                                                transaction.status === 'PENDING' ? 'bg-amber-500 text-white' :
                                                'bg-red-500 text-white'
                                            }`}>
                                                {getStatusText(transaction.status)}
                                            </span>
                                        </div>
                                        {/* ID de Referencia */}
                                        <div className="">
                                            <span className="text-gray-500 text-xs">Ref:</span>
                                            <span className="text-gray-700 text-xs font-mono ml-1">
                                                {transaction.payment?.reference || `#${transaction.id}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32 text-gray-500">
                            <p className="text-xs">No hay transacciones recientes</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
