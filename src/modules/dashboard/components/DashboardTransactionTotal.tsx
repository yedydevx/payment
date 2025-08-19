import { HiTrendingUp } from "react-icons/hi";
import { DashboardTransactionTotalProps } from '../types/dashboard.types';
import { DashboardRecentTransactions } from './DashboardRecentTransactions';

export const DashboardTransactionTotal: React.FC<DashboardTransactionTotalProps> = ({
    totalSuccessfulAmount,
    totalTransactions,
    totalSuccessfulPayments,
    totalPendingPayments,
    totalFailedPayments,
    formatCurrency,
    recentTransactions,
    getStatusText
}) => {
    return (
        <div className="w-full bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-2xl p-4 shadow-2xl border border-white/20">
            {/* Header con total de ingresos */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-md bg-white/20 backdrop-blur-sm">
                    <HiTrendingUp className="text-white text-xl" />
                </div>
                <h2 className="text-white text-xl font-semibold">Total de Ingresos</h2>
            </div>

            {/* Total de ingresos */}
            <div className="w-full inline-block p-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
                <p className="text-white text-2xl font-black tracking-tight">
                    {formatCurrency(totalSuccessfulAmount)}
                </p>
            </div>

            {/* Estadísticas grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Total Transacciones */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-white text-xs font-semibold">Total Transacciones</p>
                    <p className="text-white text-lg font-bold">{totalTransactions}</p>
                </div>

                {/* Exitosas */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-white text-xs font-semibold">Exitosas</p>
                    <p className="text-green-300 text-lg font-bold">{totalSuccessfulPayments}</p>
                </div>

                {/* Pendientes */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-white text-xs font-semibold">Pendientes</p>
                    <p className="text-yellow-300 text-lg font-bold">{totalPendingPayments}</p>
                </div>

                {/* Fallidas */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-white text-xs font-semibold">Fallidas</p>
                    <p className="text-red-300 text-lg font-bold">{totalFailedPayments}</p>
                </div>
            </div>
            <DashboardRecentTransactions
                transactions={recentTransactions}
                formatCurrency={formatCurrency}
                getStatusText={getStatusText}
            />
        </div>
    );
};
