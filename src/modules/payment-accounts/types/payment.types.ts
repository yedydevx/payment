export enum TypeAccount {
    SAVINGS = 'SAVINGS',
    CURRENT = 'CURRENT',
}

export interface PaymentCategory {
    id: number;
    name: string;
    code: string;
}

export interface CreatePaymentAccountRequest {
    name: string;
    accountNumber: string;
    type: TypeAccount;
    organizationId: number;
    branchId: number;
    categoryId: number;
    description?: string;
    currencyCode?: string;
    isActive?: boolean;
    isBranchAccount?: boolean;
    balance?: number;
}

// Interfaz para la respuesta de las cuentas de pago
export interface PaymentAccount {
    id: number;
    name: string;
    accountNumber: string;
    type: TypeAccount;
    description?: string;
    balance: number;
    currencyCode: string;
    isActive: boolean;
    isBranchAccount: boolean;
    createdAt: string;
    updatedAt: string;
    organization: {
        id: number;
        name: string;
    };
    branch?: {
        id: number;
        name: string;
    };
    category?: {
        id: number;
        name: string;
        code: string;
    };
}
