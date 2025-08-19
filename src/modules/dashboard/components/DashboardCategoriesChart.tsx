import { DashboardProps } from '../types/dashboard.types';
import { useDashboardCategoriesChart } from '../hooks/useDashboardCategoriesChart';

export const DashboardCategoriesChart: React.FC<DashboardProps> = ({ transactions }) => {
    const { categories, createDonutChart, categoryLabels } = useDashboardCategoriesChart(transactions);

    // Calcular el total recaudado por categorías
    const totalAmount = transactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    return (
        <div className="p-4 rounded-lg border border-gray-200">
            {/* Header con título y selector */}
                                         <h3 className="text-lg font-semibold text-gray-900">Estadísticas</h3>

            {/* Total destacado */}
            <div className="text-center flex items-center gap-2 py-2">
                <p className="text-md text-gray-600">Total:</p>
                                     <div className="text-md font-bold text-gray-900">
                         ${totalAmount.toLocaleString()}
                     </div>
            </div>

            {/* Gráfico de dona */}
            <div className="flex justify-center mb-6">
                <div className="relative">
                    {createDonutChart()}
                </div>
            </div>

            {/* Lista de categorías */}
            <div className="space-y-4">
                {categories.map((category ) => {
                    // Calcular el monto total para esta categoría
                    const categoryTransactions = transactions.filter(t =>
                        t.payment?.paymentAccount?.category?.name === category.method
                    );
                    const categoryAmount = categoryTransactions.reduce((sum, t) =>
                        sum + (parseFloat(t.amount) || 0), 0
                    );

                    return (
                        <div key={category.method} className="flex items-center justify-between">
                            <div
                                className="p-2 rounded-lg text-white text-sm  text-center shadow-md"
                                style={{ backgroundColor: category.color }}
                            >
                                {category.percentage}%
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">
                                        {categoryLabels[category.method as keyof typeof categoryLabels] || category.method}
                                    </div>
                                    <div className="text-xs text-gray-600 text-end">
                                        ${categoryAmount.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
