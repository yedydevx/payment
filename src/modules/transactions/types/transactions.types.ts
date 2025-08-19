import { ColumnDef } from "@tanstack/react-table";

// Enums para transacciones (coinciden con backend)
export enum TransactionType {
    PAYMENT = 'PAYMENT',
    PAYMENT_CONFIRM = 'PAYMENT_CONFIRM',
    PAYMENT_CANCEL = 'PAYMENT_CANCEL',
    REFUND = 'REFUND',
    ADJUSTMENT = 'ADJUSTMENT',
    TRANSFER = 'TRANSFER',
    OTHER = 'OTHER'
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    SUCCESSFUL = 'SUCCESSFUL', // Variación del backend
    SUCCESS = 'SUCCESS', // Otra variación del backend
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED'
}

// Función helper para verificar si un status es exitoso
export const isSuccessfulStatus = (status: string | TransactionStatus): boolean => {
    const successfulStatuses = [
        TransactionStatus.COMPLETED,
        TransactionStatus.SUCCESSFUL,
        TransactionStatus.SUCCESS,
        'COMPLETED',
        'SUCCESSFUL',
        'SUCCESS',
        'SUCCESFUL' // Para casos de typos en el backend
    ];
    return successfulStatuses.includes(status as any);
};

// Interface para transacciones (estructura exacta del backend)
export interface Transaction {
    id: number;
    transactionType: TransactionType;
    amount: string; // El backend devuelve string
    currencyCode: string;
    description?: string;
    status: TransactionStatus;
    reference: string;
    externalReference?: string | null;
    organizationId: number;
    paymentId: number;
    createdById: number;
    createdAt: string;
    updatedAt: string;
    completedAt?: string | null;
    metadata?: any | null;
    commission?: number; // Comisión de la transacción (directa desde el backend)
    // Propiedades calculadas/derivadas para facilitar el acceso
    payerName?: string; // Derivada de payment.payerName
    paymentMethod?: string; // Derivada de payment.paymentMethod
    paymentAccount?: {
        id: number;
        name: string;
        category: {
            id: number;
            name: string;
            code: string;
        };
    }; // Derivada de payment.paymentAccount
    // Relaciones incluidas por el backend
    organization: {
        id: number;
        name: string;
        tenantId: number;
    };
    payment: {
        id: number;
        reference: string;
        externalReference?: string | null;
        payerDocumentType: string;
        payerDocument: string;
        payerEmail: string;
        payerName: string;
        payerPhone: string;
        paymentMethod: string;
        amount: string; // El backend devuelve string
        status: string;
        metadata?: any | null;
        commission?: number; // Comisión de la transacción
        paymentAccount: {
            id: number;
            name: string;
            category: {
                id: number;
                name: string;
                code: string;
            };
        };
    };
    createdBy: {
        id: number;
        name: string;
        email: string;
    };
}

export interface BillPayment {
    id: string;
    title: string;
    amount: string;
    icon: any;
    daysLeft: number;
    dueDate: string;
    progress: number;
}

export interface Column {
    id: string;
    header: string;
    accessorKey: string;
    size: number;
    enableSorting?: boolean;
    cell?: (props: any) => React.ReactNode;
}

// Tipo BaseColumn para tablas (compatible con TableComponent)
export type BaseColumn<T> = Omit<ColumnDef<T>, 'id' | 'header' | 'accessorKey'> & {
    id: string;
    header: string;
    accessorKey: string;
    size?: number;
    enableHiding?: boolean;
    enableSorting?: boolean;
    enableFiltering?: boolean;
}


