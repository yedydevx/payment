// import { User } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useTransactions } from '../../../transactions/hooks/useTransactions';
// import { isSuccessfulStatus } from '../../../transactions/types/transactions.types';

// export const IncomeRecientTransfer = () => {
//     const navigate = useNavigate();
//     const { transactions, loading, error } = useTransactions();

//     // Obtener solo las 5 transacciones más recientes
//     const recentTransactions = transactions
//         .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//         .slice(0, 5);

//     const handleShowMore = () => navigate('/transacciones');

//     const getStatusColor = (status: string) => {
//         if (isSuccessfulStatus(status)) {
//             return 'bg-[#2d524d] text-[#b9f09e]';
//         } else if (status === 'PENDING') {
//             return 'bg-[#b9f09e] text-[#2d524d]';
//         } else {
//             return 'bg-red-100 text-red-600';
//         }
//     };

//     const getStatusText = (status: string) => {
//         if (isSuccessfulStatus(status)) {
//             return 'Exitoso';
//         } else if (status === 'PENDING') {
//             return 'Pendiente';
//         } else {
//             return 'Fallido';
//         }
//     };

//     const formatAmount = (amount: string) => {
//         const numericAmount = parseFloat(amount);
//         return new Intl.NumberFormat('es-CO', {
//             style: 'currency',
//             currency: 'COP',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0
//         }).format(numericAmount);
//     };

//     if (loading) {
//         return (
//             <div className='w-full h-full border border-gray-200 rounded-lg p-4 flex flex-col gap-4'>
//                 <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-gray-800">Transferencias Recientes</h3>
//                     <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
//                 </div>
//                 <div className="flex gap-4">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                         <div key={i} className="min-w-[280px] h-24 bg-gray-200 rounded-lg animate-pulse"></div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className='w-full h-full border border-gray-200 rounded-lg p-4 flex flex-col gap-4'>
//                 <div className="flex justify-between items-center">
//                     <h3 className="text-lg font-semibold text-gray-800">Transferencias Recientes</h3>
//                     <a
//                         href="/transacciones"
//                         onClick={handleShowMore}
//                         className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
//                     >
//                         Mostrar más
//                     </a>
//                 </div>
//                 <div className="flex items-center justify-center h-32">
//                     <p className="text-red-500 text-sm">Error al cargar transacciones: {error}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='w-full h-full border border-gray-200 rounded-lg p-4 flex flex-col gap-4'>
//             <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-800">Transferencias Recientes</h3>
//                 <a
//                     href="/transacciones"
//                     onClick={handleShowMore}
//                     className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
//                 >
//                     Mostrar más
//                 </a>
//             </div>

//             <div className='w-full flex gap-4 overflow-x-auto pb-2'>
//                 {recentTransactions.map((transaction) => (
//                     <div key={transaction.id} className='min-w-[280px] flex-shrink-0'>
//                         <div className='w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow'>
//                             <div className="flex items-start justify-between gap-4">
//                                 {/* Avatar con icono de usuario */}
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 bg-[#b9f09e] rounded-full flex items-center justify-center">
//                                         <User className="w-5 h-5 text-[#2d524d]" />
//                                     </div>
//                                     <div className="flex flex-col gap-1">
//                                         <h4 className="font-semibold text-gray-800 text-sm">{transaction.payment.payerName}</h4>
//                                         <p className="text-xs text-gray-500">{transaction.payment.paymentAccount.category.name}</p>
//                                     </div>
//                                 </div>

//                                 {/* Monto y estado */}
//                                 <div className="flex flex-col items-end gap-1">
//                                     <p className="font-semibold text-gray-800 text-sm">{formatAmount(transaction.payment.amount)}</p>
//                                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.payment.status)}`}>
//                                         {getStatusText(transaction.payment.status)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
