import { HiCalendar } from "react-icons/hi";
import { DashboardProps } from '../types/dashboard.types';
import { useDashboardAnalyticsDays } from '../hooks/useDashboardAnalyticsDays';

export const DashboardAnalyticsDays: React.FC<DashboardProps> = ({
    transactions,
    formatCurrency
}) => {
    const { lastMonthIncome, last15DaysIncome, last5DaysIncome } = useDashboardAnalyticsDays({ transactions, formatCurrency });
    return (
        <div className="flex flex-col gap-1 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-md bg-white/20 backdrop-blur-sm">
                    <HiCalendar className="text-white text-xl" />
                </div>
                <h2 className="text-white text-xl font-semibold">Resumen del mes</h2>
            </div>

            {/* Ingresos del Mes */}
            <p className="text-white text-xs font-semibold">Último Mes:</p>
            <div className="w-full inline-block p-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-white text-md font-black tracking-tight">
                    {lastMonthIncome.amount > 0 ? formatCurrency?.(lastMonthIncome.amount) : 'Sin ingresos'}
                </p>
            </div>

            {/* Últimos 15 días */}
            <p className="text-white text-xs font-semibold">Últimos 15 días:</p>
            <div className="w-full inline-block p-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-white text-md font-black tracking-tight">
                    {last15DaysIncome.amount > 0 ? formatCurrency?.(last15DaysIncome.amount) : 'Sin ingresos'}
                </p>
            </div>

            {/* Últimos 5 días */}
            <p className="text-white text-xs font-semibold">Últimos 5 días:</p>
            <div className="w-full inline-block p-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-white text-md font-black tracking-tight">
                    {last5DaysIncome.amount > 0 ? formatCurrency?.(last5DaysIncome.amount) : 'Sin ingresos'}
                </p>
            </div>
        </div>
    );
};
