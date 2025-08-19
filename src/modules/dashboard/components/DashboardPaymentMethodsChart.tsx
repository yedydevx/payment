// import { Church } from 'lucide-react';
// import { DashboardProps } from '../types/dashboard.types';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useDashboardCategoriesChart } from '../hooks/useDashboardCategoriesChart';

// export const DashboardCategoriesChart: React.FC<DashboardProps> = ({ transactions }) => {
//     const { paymentMethods, createDonutChart, PAYMENT_METHOD_LABELS } = useDashboardCategoriesChart(transactions);

//     // Calcular el total recaudado por categorías
//     const totalAmount = transactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

//     // Encontrar la categoría más pagada
//     const mostPaidCategory = paymentMethods.length > 0 ? paymentMethods[0] : null;

//     return (
//         <Card className="w-full">
//             <CardHeader className="pb-2">
//                 <CardTitle className="flex items-center gap-2 text-xl font-semibold">
//                     <div className="p-2 bg-gray-900 rounded-lg">
//                         <Church className="h-4 w-4 text-white" />
//                     </div>
//                     Categorías de Recaudo
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="">
//                 {/* Gráfica de dona y leyenda lado a lado */}
//                 <div className="flex flex-col items-center gap-2">
//                     {/* Gráfica de dona */}
//                     <div className="flex-shrink-0">
//                         {createDonutChart()}
//                     </div>

//                     {/* Información adicional */}
//                     <div className="text-center mb-3">
//                         <div className="text-sm text-gray-600">Total Recaudado</div>
//                         <div className="text-lg font-bold text-gray-900">
//                             ${totalAmount.toLocaleString('es-CO')}
//                         </div>
//                         {mostPaidCategory && (
//                             <div className="text-xs text-gray-500 mt-1">
//                                 Categoría más pagada: <span className="font-medium">{mostPaidCategory.method}</span>
//                             </div>
//                         )}
//                     </div>

//                     {/* Leyenda */}
//                     <div className="w-full flex flex-col gap-2">
//                         {paymentMethods.map((method: any) => {
//                             // Calcular el monto total para esta categoría
//                             const categoryTransactions = transactions.filter(t =>
//                                 t.payment?.paymentAccount?.category?.name === method.method
//                             );
//                             const categoryAmount = categoryTransactions.reduce((sum, t) =>
//                                 sum + (parseFloat(t.amount) || 0), 0
//                             );

//                             return (
//                                 <div key={method.method} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
//                                     <div className="flex items-center gap-2">
//                                         <div
//                                             className="w-3 h-3 rounded-full"
//                                             style={{ backgroundColor: method.color }}
//                                         ></div>
//                                         <span className="font-medium text-gray-700">
//                                             {PAYMENT_METHOD_LABELS[method.method as keyof typeof PAYMENT_METHOD_LABELS] || method.method}
//                                         </span>
//                                     </div>
//                                     <div className="flex flex-col items-end">
//                                         <div className="text-xs font-semibold text-gray-500">{method.percentage}%</div>
//                                         <div className="text-xs text-gray-400">
//                                             ${categoryAmount.toLocaleString('es-CO')}
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };
