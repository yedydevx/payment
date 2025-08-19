import { Transaction, BaseColumn } from '../types/transactions.types';
import { Church, DollarSign } from 'lucide-react';

export const getTransactionColumns = (): BaseColumn<Transaction>[] => [
    {
        id: "transactionName",
        header: "Nombre de la Transacción",
        accessorKey: "payment.reference",
        cell: ({ row }) => {
            const payerName = row.original.payment?.payerName as string;
            const categoryName = row.original.payment?.paymentAccount?.category?.name;

            // Configuración de iconos y colores por categoría
            const getCategoryConfig = (category: string) => {
                if (category?.toLowerCase().includes('diezmo')) {
                    return {
                        icon: Church,
                        bgColor: 'bg-[#b9f09e]',
                        iconColor: 'text-[#2d524d]'
                    };
                } else if (category?.toLowerCase().includes('donacion')) {
                    return {
                        icon: DollarSign,
                        bgColor: 'bg-[#b9f09e]',
                        iconColor: 'text-[#2d524d]'
                    };
                } else {
                    return {
                        icon: DollarSign,
                        bgColor: 'bg-gray-50',
                        iconColor: 'text-gray-600'
                    };
                }
            };

            const categoryConfig = getCategoryConfig(categoryName);
            const IconComponent = categoryConfig.icon;

            return (
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${categoryConfig.bgColor} rounded-full flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${categoryConfig.iconColor}`} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-normal text-sm text-gray-900">
                            {payerName || 'Transacción sin nombre'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                            {categoryName || "N/A"}
                </span>
                    </div>
                </div>
            )
        },
        size: 200,
        minSize: 180,
        maxSize: 250,
        enableSorting: true,
        enableFiltering: true,
    },

    {
        id: "paymentMethod",
        header: "Método de Pago",
        accessorKey: "payment.paymentMethod",
        cell: ({ row }) => {
            const paymentMethod = row.original.payment.paymentMethod as string;

            const getMethodConfig = (method: string) => {
                if (method === 'CREDIT_CARD') {
                    return {
                        icon: (
                            <div className="w-10 h-6 bg-white border border-gray-300 rounded-sm flex items-center justify-center">
                                <div className="w-3 h-3 bg-[#b9f09e] rounded-full"></div>
                                <div className="w-3 h-3 bg-[#2d524d] rounded-full"></div>
                            </div>
                        ),
                        label: 'Tarjeta de Crédito',
                        textColor: 'text-[#2d524d]'
                    };
                } else if (method === 'DEBIT_CARD') {
                    return {
                        icon: (
                            <div className="w-10 h-6 bg-white border border-gray-300 rounded-sm flex items-center justify-center">
                                <div className="w-3 h-3 bg-[#b9f09e] rounded-full"></div>
                                <div className="w-3 h-3 bg-[#2d524d] rounded-full"></div>
                            </div>
                        ),
                        label: 'Tarjeta de Débito',
                        textColor: 'text-[#2d524d]'
                    };
                } else if (method === 'PSE') {
                    return {
                        icon: (
                            <div className="w-10 h-6  rounded-sm flex items-center justify-center border border-[#2d524d]">
                                <span className="text-[14px] font-normal text-[#2d524d]">PSE</span>
                            </div>
                        ),
                        label: 'PSE',
                        textColor: 'text-[#2d524d]'
                    };
                } else {
                    return {
                        icon: (
                            <div className="w-6 h-4 bg-gray-100 rounded-sm flex items-center justify-center border border-gray-300">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                        ),
                        label: method || 'N/A',
                        textColor: 'text-gray-600'
                    };
                }
            };

            const config = getMethodConfig(paymentMethod);

            return (
                <div className="flex items-center gap-3">
                    {config.icon}
                    <span className={`text-sm font-normal ${config.textColor}`}>
                    {config.label}
                    </span>
                </div>
            );
        },
        size: 180,
        minSize: 160,
        maxSize: 200,
        enableSorting: true,
        enableFiltering: true,
    },
    {
        id: "paymentId",
        header: "Transacción ID",
        accessorKey: "payment.id",
        cell: ({ row }) => {
            const id = row.original.payment?.id as number | undefined
            return (
                <span className="font-normal text-md text-[#2d524d]" title={id?.toString() || ''}>
                    {typeof id === 'number' ? id : 'N/A'}
                </span>
            )
        },
        size: 100,
        minSize: 80,
        maxSize: 120,
        enableSorting: true,
        enableFiltering: true,
    },
    {
        id: "createdAt",
        header: "Fecha Pago",
        accessorKey: "createdAt",
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as string;
            const formattedDate = date ? new Date(date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }) : "N/A";
            const formattedTime = date ? new Date(date).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
            }) : "N/A";

            return (
                <div className="flex flex-col">
                    <span className="font-normal text-sm text-gray-900">
                        {formattedDate}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                        {formattedTime}
                    </span>
                </div>
            );
        },
        size: 120,
        enableSorting: true,
        enableFiltering: true,
    },
    {
        id: "amount",
        header: "Monto",
        accessorKey: "amount",
        cell: ({ row }) => {
            const amount = row.getValue("amount") as string;
            const currencyCode = row.original.currencyCode;
            const numericAmount = parseFloat(amount);
            const formattedAmount = !isNaN(numericAmount) ? new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: currencyCode || 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(numericAmount) : "N/A";

            return (
                <div className="font-normal text-start truncate text-sm max-w-full">
                    {formattedAmount}
                </div>
            );
        },
        size: 120,
        minSize: 100,
        maxSize: 140,
        enableSorting: true,
        enableFiltering: true,
    },
            {
            id: "commission",
            header: "Comisión",
            accessorKey: "commission",
                cell: ({ row }) => {
            const commission = row.original.commission;
            const amount = typeof commission === 'string' ? parseFloat(commission) : commission;
            const currencyCode = row.original.currencyCode || 'COP';

            const formatted = typeof amount === 'number' && !isNaN(amount)
                ? new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: currencyCode,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(amount)
                : 'N/A';

            return (
                <div className="font-medium text-start truncate">
                    {formatted}
                </div>
            );
        },
        size: 140,
        enableSorting: true,
        enableFiltering: true,
    },
    {
        id: "payerName",
        header: "Responsable",
        accessorKey: "payment.payerName",
        cell: ({ row }) => {
            const payerName = row.original.payment.payerName as string;
            return (
                <span className="font-normal text-start truncate text-sm max-w-full">
                    {payerName || "N/A"}
                </span>
            );
        },
        size: 160,
        minSize: 140,
        maxSize: 180,
        enableSorting: true,
        enableFiltering: true,
    },
    {
        id: "paymentReference",
        header: "Referencia de Pago",
        accessorKey: "payment.reference",
        cell: ({ row }) => {
            const reference = row.original.payment?.reference as string | undefined
            return (
                <span className="font-medium" title={reference || ''}>
                    {reference || 'N/A'}
                </span>
            )
        },
        size: 200,
        enableSorting: true,
        enableFiltering: true,
    },
    {
        id: "payerDescription",
        header: "Notas",
        accessorKey: "payment.description",
        cell: ({ row }) => {
            const description = row.original.description as string;

            // Limpiar la descripción eliminando "Creación de pago:" si existe
            const cleanDescription = description?.replace(/^Creación de pago:\s*/i, '') || '';

            return (
                <span className="font-normal truncate" title={cleanDescription || ''}>
                    {cleanDescription || 'N/A'}
                </span>
            )
        },
        size: 100,
        enableSorting: true,
        enableFiltering: true,
    },
    {
        id: "status",
        header: "Estado del Pago",
        accessorKey: "status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusConfig: Record<string, { bgColor: string, textColor: string, label: string }> = {
                PENDING: {
                    bgColor: 'bg-[#b9f09e]',
                    textColor: 'text-[#2d524d]',
                    label: 'Pendiente'
                },
                COMPLETED: {
                    bgColor: 'bg-[#2d524d]',
                    textColor: 'text-[#b9f09e]',
                    label: 'Completado'
                },
                SUCCESSFUL: {
                    bgColor: 'bg-[#2d524d]',
                    textColor: 'text-[#b9f09e]',
                    label: 'Exitoso'
                },
                SUCCESS: {
                    bgColor: 'bg-[#2d524d]',
                    textColor: 'text-[#b9f09e]',
                    label: 'Exitoso'
                },
                SUCCESFUL: {
                    bgColor: 'bg-[#2d524d]',
                    textColor: 'text-[#b9f09e]',
                    label: 'Exitoso'
                },
                FAILED: {
                    bgColor: 'bg-red-200',
                    textColor: 'text-red-700',
                    label: 'Fallido'
                },
                CANCELLED: {
                    bgColor: 'bg-gray-200',
                    textColor: 'text-gray-700',
                    label: 'Cancelado'
                },
            };
            const config = statusConfig[status] || {
                bgColor: 'bg-gray-200',
                textColor: 'text-gray-700',
                label: status
            };

            return (
                <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-normal ${config.bgColor} ${config.textColor}`}>
                    {config.label}
                </div>
            );
        },
        size: 100,
        minSize: 80,
        maxSize: 120,
        enableSorting: true,
        enableFiltering: true,
    },
];
