import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardTransactionStatsProps {
    totalSuccessful: number;
    totalPending: number;
    totalFailed: number;
    totalTransactions: number;
}

export const DashboardTransactionStats: React.FC<DashboardTransactionStatsProps> = ({
    totalSuccessful,
    totalPending,
    totalFailed,
    totalTransactions
}) => {
    const stats = [
        {
            title: "Transacciones Exitosas",
            value: totalSuccessful,
            total: totalTransactions,
            percentage: totalTransactions > 0 ? Math.round((totalSuccessful / totalTransactions) * 100) : 0,
            icon: CheckCircle,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-900",
            valueColor: "text-gray-900",
        },
        {
            title: "Transacciones Pendientes",
            value: totalPending,
            total: totalTransactions,
            percentage: totalTransactions > 0 ? Math.round((totalPending / totalTransactions) * 100) : 0,
            icon: Clock,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-900",
            valueColor: "text-gray-900",
        },
        {
            title: "Transacciones Fallidas",
            value: totalFailed,
            total: totalTransactions,
            percentage: totalTransactions > 0 ? Math.round((totalFailed / totalTransactions) * 100) : 0,
            icon: XCircle,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-900",
            valueColor: "text-gray-900",
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
            {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <Card key={index} className="w-full border-0 shadow-sm bg-white">
                        <CardContent className="p-3">
                            {/* Header con icono y título */}
                            <div className="flex items-center justify-between mb-2">
                                <div className={`w-8 h-8 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                                    <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                                </div>
                                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                    {stat.percentage}%
                                </div>
                            </div>

                            {/* Valor principal */}
                            <div className="mb-2">
                                <div className={`text-xl font-bold ${stat.valueColor}`}>
                                    {stat.value}
                                </div>
                            </div>

                            {/* Título y tendencia */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-900">
                                    {stat.title}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
