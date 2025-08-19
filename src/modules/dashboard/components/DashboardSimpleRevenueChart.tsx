import { DashboardProps } from '../types/dashboard.types';
import { useDashboardSimpleRevenueChart } from '../hooks/useDashboardSimpleRevenueChart';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const DashboardSimpleRevenueChart = ({ className, transactions }: DashboardProps) => {
    const { chartData, formatCurrency } = useDashboardSimpleRevenueChart(transactions);

    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${className}`}>
            {/* Header más compacto */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-md font-bold text-gray-800">Ingresos Mensuales</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Últimos 6 meses</span>
                    <div className="w-2 h-2 bg-[#2d524d] rounded-full"></div>
                </div>
            </div>

            {/* Gráfico de Barras más delgado */}
            <div className="h-48 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 15, right: 20, left: 15, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            fontSize={11}
                            tickLine={false}
                            axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                color: '#1f2937',
                                fontSize: '12px'
                            }}
                            formatter={(value: number) => [formatCurrency(value), 'Ingresos']}
                            labelStyle={{ color: '#374151', fontWeight: '600', fontSize: '12px' }}
                        />
                        <Bar
                            dataKey="uv"
                            fill="url(#greenGradient)"
                            radius={[4, 4, 0, 0]}
                            stroke="none"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Definición del gradiente verde para las barras */}
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#b9f09e" />
                        <stop offset="100%" stopColor="#2d524d" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
