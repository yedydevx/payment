import React from 'react';
import { DashboardProps } from '../types/dashboard.types';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const DashboardTableRecient: React.FC<DashboardProps> = ({ transactions }) => {
    const navigate = useNavigate();
    // Obtener las transacciones más recientes (últimas 5)
    const recentTransactions = transactions
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    // Función para formatear la fecha
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Función para formatear la hora
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    // Función para obtener el color del estado
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'successful':
            case 'succesful':
            case 'success':
            case 'completed':
                return ' text-gray-900 rounded-sm border border-gray-200';
            case 'pending':
                return 'text-yellow-600  rounded-sm border border-gray-200';
            case 'failed':
            case 'fallido':
                return 'text-red-600  rounded-sm border border-gray-200';
            default:
                return 'text-gray-800  rounded-sm border border-gray-200';
        }
    };

    // Función para obtener el texto del estado
    const getStatusText = (status: string) => {
        switch (status.toLowerCase()) {
            case 'successful':
                return 'Exitoso';
            case 'succesful':
                return 'Exitoso';
            case 'success':
                return 'Exitoso';
            case 'pending':
                return 'Pendiente';
            case 'failed':
            case 'fallido':
                return 'Fallido';
            default:
                return status;
        }
    };

    return (
        <Card className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between p-3 items-center">
                <div className="text-base font-semibold text-gray-900">
                    Transacciones Recientes
                </div>
                <Button
                    size="sm"
                    className="text-white  font-medium text-xs bg-gray-900 rounded-sm cursor-pointer"
                    onClick={() => navigate('/transacciones')}
                >
                    Ver todas
                </Button>
            </div>
            <CardContent className="p-3">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Header de la tabla */}
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-normal text-gray-700 bg-gray-100 text-xs">
                                    Transacción
                                </th>
                                <th className="text-left py-2 px-3 font-normal text-gray-700 bg-gray-100 text-xs">
                                    Fecha
                                </th>
                                <th className="text-left py-2 px-3 font-normal text-gray-700 bg-gray-100 text-xs">
                                    Monto
                                </th>
                                <th className="text-left py-2 px-3 font-normal text-gray-700 bg-gray-100 text-xs w-20">
                                    Nota
                                </th>
                                <th className="text-left py-2 px-3 font-normal text-gray-700 bg-gray-100 text-xs">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        {/* Cuerpo de la tabla */}
                        <tbody>
                            {recentTransactions.map((transaction, index) => (
                                <tr
                                    key={transaction.id}
                                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                        index === recentTransactions.length - 1 ? 'border-b-0' : ''
                                    }`}
                                >
                                    {/* Nombre de la transacción */}
                                    <td className="py-2 px-2">
                                        <div className="flex flex-col max-w-[120px]">
                                            <div className="overflow-hidden">
                                                <span className="font-medium text-gray-900 text-xs block truncate">
                                                    {transaction.payment?.payerName || 'Sin nombre'}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {transaction.payment?.paymentAccount?.category?.name || 'Sin categoría'}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Fecha y Hora */}
                                    <td className="py-2 px-2">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1 text-xs text-gray-900">
                                                {formatDate(transaction.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                {formatTime(transaction.createdAt)}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Monto */}
                                    <td className="py-2 px-2">
                                        <span className="font-semibold text-gray-900 text-xs">
                                            ${parseFloat(transaction.amount).toLocaleString()}
                                        </span>
                                    </td>

                                    {/* Nota/Descripción */}
                                    <td className="py-2 px-3">
                                        <div className="max-w-[80px] overflow-hidden">
                                            <span className="text-xs text-gray-700 block truncate">
                                                {(() => {
                                                    const description = transaction.description || 'Sin descripción';
                                                    if (description.startsWith('Creación de pago:')) {
                                                        return description.replace('Creación de pago:', '').trim();
                                                    }
                                                    return description;
                                                })()}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Estado del Pago */}
                                    <td className="py-2 px-3">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                            {getStatusText(transaction.status)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mensaje si no hay transacciones */}
                {recentTransactions.length === 0 && (
                    <div className="text-center py-6 text-gray-500 text-sm">
                        No hay transacciones recientes para mostrar
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
