// import { useMemo } from 'react';
// import { PaymentMethodData } from '../types/dashboard.types';
// import { Transaction } from '@/modules/transactions/types/transactions.types';

// export const useDashboardPaymentMethodsChart = (transactions: Transaction[]) => {
//     // Colores para las categorías de recaudo usando nuestros 3 tonos verdes
//     const CATEGORY_COLORS = {
//         'Diezmos': '#2d524d',        // Verde oscuro (principal)
//         'Donaciones': '#b9f09e',      // Verde claro
//         'Otros': '#8bc34a',          // Verde intermedio
//         'N/A': '#6b7280'             // Gris para N/A
//     };

//     // Etiquetas para las categorías de recaudo
//     const CATEGORY_LABELS = {
//         'Diezmos': 'Diezmos',
//         'Donaciones': 'Donaciones',
//         'Otros': 'Otras Categorías',
//         'N/A': 'Sin Categoría'
//     };

//     // Calcular distribución de categorías de recaudo y montos
//     const paymentMethods = useMemo(() => {
//         const categoryData = new Map<string, { count: number; totalAmount: number }>();

//         transactions.forEach(transaction => {
//             const categoryName = transaction.payment?.paymentAccount?.category?.name || 'N/A';
//             const amount = parseFloat(transaction.amount) || 0;

//             const current = categoryData.get(categoryName) || { count: 0, totalAmount: 0 };
//             categoryData.set(categoryName, {
//                 count: current.count + 1,
//                 totalAmount: current.totalAmount + amount
//             });
//         });

//         const totalTransactions = transactions.length;
//         const totalAmount = transactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

//         const methods: PaymentMethodData[] = [];

//         categoryData.forEach((data, category) => {
//             const percentage = totalTransactions > 0 ? Math.round((data.count / totalTransactions) * 100) : 0;
//             methods.push({
//                 method: category,
//                 count: data.count,
//                 percentage,
//                 color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#6b7280'
//             });
//         });

//         // Ordenar por porcentaje descendente
//         return methods.sort((a, b) => b.percentage - a.percentage);
//     }, [transactions]);

//     // Crear el SVG de la gráfica de dona
//     const createDonutChart = (size: number = 120) => {
//         if (paymentMethods.length === 0) return null;

//         const radius = size / 2;
//         const innerRadius = radius * 0.6;
//         const strokeWidth = radius - innerRadius;

//         let currentAngle = -90; // Empezar desde arriba
//         const paths: React.ReactElement[] = [];

//         paymentMethods.forEach((method, index) => {
//             const angle = (method.percentage / 100) * 360;
//             const endAngle = currentAngle + angle;

//             // Calcular coordenadas del arco
//             const x1 = radius + (innerRadius + strokeWidth / 2) * Math.cos((currentAngle * Math.PI) / 180);
//             const y1 = radius + (innerRadius + strokeWidth / 2) * Math.sin((currentAngle * Math.PI) / 180);
//             const x2 = radius + (innerRadius + strokeWidth / 2) * Math.cos((endAngle * Math.PI) / 180);
//             const y2 = radius + (innerRadius + strokeWidth / 2) * Math.sin((endAngle * Math.PI) / 180);

//             // Crear el path del arco
//             const largeArcFlag = angle > 180 ? 1 : 0;
//             const pathData = [
//                 `M ${x1} ${y1}`,
//                 `A ${innerRadius + strokeWidth / 2} ${innerRadius + strokeWidth / 2} 0 ${largeArcFlag} 1 ${x2} ${y2}`
//             ].join(' ');

//             paths.push(
//                 <path
//                     key={index}
//                     d={pathData}
//                     fill="none"
//                     stroke={method.color}
//                     strokeWidth={strokeWidth}
//                     strokeLinecap="round"
//                 />
//             );

//             currentAngle = endAngle;
//         });

//         return (
//             <svg width={size} height={size} className="mx-auto">
//                 {paths}
//                 {/* Círculo central */}
//                 <circle
//                     cx={radius}
//                     cy={radius}
//                     r={innerRadius}
//                     fill="white"
//                 />
//                 {/* Texto central */}
//                 <text
//                     x={radius}
//                     y={radius - 5}
//                     textAnchor="middle"
//                     className="text-xs font-bold text-gray-600"
//                 >
//                     {paymentMethods.length} categorías
//                 </text>
//             </svg>
//         );
//     };

//     return {
//         paymentMethods,
//         createDonutChart,
//         PAYMENT_METHOD_LABELS: CATEGORY_LABELS
//     };
// };
