import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';

interface DashboardDailyLimitProps {
    dailyLimit: number;
    spentAmount: number;
    currency?: string;
}

export const DashboardDailyLimit: React.FC<DashboardDailyLimitProps> = ({
    dailyLimit,
    spentAmount,
    currency = 'COP'
}) => {
    // Calcular el porcentaje gastado
    const spentPercentage = Math.min((spentAmount / dailyLimit) * 100, 100);

    // Calcular el monto restante
    const remainingAmount = Math.max(dailyLimit - spentAmount, 0);

    // Determinar el color de la barra según el porcentaje
    const getProgressBarColor = (percentage: number) => {
        if (percentage >= 80) return 'bg-red-500'; // Rojo si está cerca del límite
        if (percentage >= 60) return 'bg-yellow-500'; // Amarillo si está en el medio
        return 'bg-gray-900'; // Negro si está bien
    };

    // Formatear moneda
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Card className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-4">
                <CardTitle className="text-base font-semibold text-gray-900">
                    Límite Diario
                </CardTitle>
                <MoreVertical className="h-4 w-4 text-gray-500" />
            </div>
            <CardContent className="px-4 pb-4">
                {/* Información del gasto */}
                <div className="mb-4">
                    <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold text-gray-900">
                            {formatCurrency(spentAmount)}
                        </span>
                        <span className="text-gray-500"> gastado de </span>
                        <span className="font-semibold text-gray-900">
                            {formatCurrency(dailyLimit)}
                        </span>
                    </div>
                                         <div className="w-16 text-center text-sm mt-4 bg-gray-900 rounded-full px-2 py-1 font-medium text-white">
                         {spentPercentage.toFixed(1)}%
                     </div>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(spentPercentage)}`}
                        style={{ width: `${spentPercentage}%` }}
                    ></div>
                </div>

                {/* Información adicional */}
                <div className="flex justify-between text-xs text-gray-600">
                    <span>Restante: {formatCurrency(remainingAmount)}</span>
                    <span>Límite: {formatCurrency(dailyLimit)}</span>
                </div>
            </CardContent>
        </Card>
    );
};
