import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Home } from 'lucide-react';

interface SavingPlan {
    id: string;
    name: string;
    currentAmount: number;
    icon: React.ReactNode;
    color: string;
}

interface DashboardSavingPlansProps {
    plans?: SavingPlan[];
}

export const DashboardSavingPlans: React.FC<DashboardSavingPlansProps> = ({ plans }) => {
    // Datos mock relevantes para una iglesia
    const mockPlans: SavingPlan[] = [
        {
            id: '1',
            name: 'Fondo de Emergencia',
            currentAmount: 5000000, // 5 millones
            icon: <AlertTriangle className="w-5 h-5 text-white" />,
            color: 'bg-[#b9f09e]'
        },
        {
            id: '2',
            name: 'Construcción Nueva Sede',
            currentAmount: 15000000, // 15 millones
            icon: <Home className="w-5 h-5 text-white" />,
            color: 'bg-[#b9f09e]'
        }
    ];

    const displayPlans = plans || mockPlans;

    // Calcular el total de ahorros
    const totalSavings = displayPlans.reduce((sum, plan) => sum + plan.currentAmount, 0);

    // Formatear moneda
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Card className="w-full bg-white rounded-lg border border-gray-200 ">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-gray-900">
                        Metas Financieras
                    </div>
                </div>

                {/* Total de Ahorros */}
                <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">Total Ahorrado</div>
                    <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(totalSavings)}
                    </div>
                </div>

                {/* Lista de Planes */}
                <div className="space-y-4">
                    {displayPlans.map((plan) => {
                        const percentage = Math.min((plan.currentAmount / plan.currentAmount) * 100, 100);

                        return (
                            <div key={plan.id} className="rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center`}>
                                            {plan.icon}
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {plan.name}
                                        </div>
                                    </div>
                                </div>

                                {/* Barra de Progreso */}
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                    <div
                                        className="h-2 rounded-full bg-gray-900 transition-all duration-300"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>

                                {/* Información del Plan */}
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {formatCurrency(plan.currentAmount)}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {percentage.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};
