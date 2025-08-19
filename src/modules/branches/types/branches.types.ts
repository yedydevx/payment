import { ServiceResponse } from "@/types/services/services.type";

// Interfaces basadas en el backend analizado
export interface Organization {
    id: number;
    name: string;
    tenantId: number;
}

export interface PaymentAccount {
    id: number;
    name: string;
    accountNumber: string;
    type?: string; // Tipo de cuenta: corriente, ahorro, etc.
    // Agregar más campos según necesidad
}

export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    roleCode: string;
    // Agregar más campos según necesidad
}

// DTO para crear sucursal (coincide con backend)
export interface CreateBranchDto {
    name: string;
    code?: string;
    isPrimary?: boolean;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    organizationId?: number; // Se asigna automáticamente en el backend
}

// DTO para actualizar sucursal
export interface UpdateBranchDto {
    name?: string;
    code?: string;
    isPrimary?: boolean;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    // Campos para cuenta de cobro
    accountName?: string;
    accountNumber?: string;
    accountType?: string;
}

// DTO para crear usuario (según backend)
export interface CreateUserDto {
    email: string;
    name: string;
    lastName?: string;
    password: string;
    tenantId: number;
    isActive?: boolean;
    roleCode: string;
    organizationId?: number;
    branchId?: number;
}

// Respuesta completa de sucursal (incluye relaciones)
export interface BranchResponse {
    id: number;
    name: string;
    code?: string;
    isPrimary: boolean;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    organizationId: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;

    // Relaciones incluidas cuando se hace include en el backend
    organization?: Organization;
    paymentAccounts?: PaymentAccount[];
    users?: User[];
}

// Respuesta al crear sucursal (backend retorna branch + user creado)
export interface CreateBranchResponse {
    branch: BranchResponse;
    user: User;
}

// Respuesta al eliminar sucursal
export interface DeleteBranchResponse {
    message: string;
}

// Aliases para compatibilidad
export type CreateBranchRequest = CreateBranchDto;
export type UpdateBranchRequest = UpdateBranchDto;
export type CreateUserRequest = CreateUserDto;

// Respuestas del servicio (mantiene estructura actual)
export interface BranchesServiceResponse extends ServiceResponse {
    data?: BranchResponse[];
}

export interface BranchServiceResponse extends ServiceResponse {
    data?: BranchResponse | CreateBranchResponse;
}

export interface DeleteBranchServiceResponse extends ServiceResponse {
    data?: DeleteBranchResponse;
}

export interface BranchFormData extends Omit<CreateBranchDto, 'organizationId'> {
    code: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export interface BranchUserFormData extends Omit<CreateUserDto, 'tenantId'> {
    confirmPassword: string;
    lastName: string;
}

export interface Branches {
    name: string;
    code: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    createdAt: string;
}

export interface CreateBranchFormData {
    branch: BranchFormData;
    user: BranchUserFormData;
}

interface BaseFormStepProps<T> {
    data: T;
    onChange: (data: T) => void;
    onNext: () => void;
    onBack?: () => void;
    errors?: Record<string, string>;
}

export interface BranchFormStepProps extends BaseFormStepProps<BranchFormData> {}

// Props para el paso de usuario simplificado (automático)
export interface BranchUserFormStepProps {
    onNext: () => void;
    onBack: () => void;
}

export interface BranchSummaryStepProps {
    branchData: BranchFormData;
    userData: BranchUserFormData;
    onSubmit: () => void;
    onBack: () => void;
    isLoading: boolean;
}

export type BranchFormStep = 0 | 1 | 2; // 0: branch, 1: user, 2: summary

// Estados para el manejo de la UI
export interface BranchState {
    branches: BranchResponse[];
    currentBranch: BranchResponse | null;
    isLoading: boolean;
    error: string | null;
}

// Parámetros para filtros y búsquedas
export interface BranchFilters {
    organizationId?: number;
    isPrimary?: boolean;
    search?: string;
    isActive?: boolean;
    city?: string;
    state?: string;
}

// Estadísticas de sucursales
export interface BranchStats {
    total: number;
    primary: number;
    withEmail: number;
    withPhone: number;
    withAddress: number;
    byCity: Record<string, number>;
}

// Permisos según rol (basado en backend)
export interface BranchPermissions {
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canViewAll: boolean;
    canSetPrimary: boolean;
}

// Configuración de roles según backend
export enum UserRole {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    BRANCH_ADMIN = 'BRANCH_ADMIN',
    BRANCH_USER = 'BRANCH_USER',
    CASHIER = 'CASHIER',
    ACCOUNTANT = 'ACCOUNTANT'
}

// Props para el modal de eliminación
export interface DeleteBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    branch: BranchResponse | null;
    onConfirm: () => Promise<void> | void;
    loading?: boolean;
}

export interface BranchActionsProps {
    onView: (branch: BranchResponse) => void;
    onEdit: (branch: BranchResponse) => void;
    onDelete: (branch: BranchResponse) => void;
}

export interface BranchesFormProps {
    onSuccess?: () => Promise<void> | void;
    onBack: () => void;
}

export interface BranchesSummaryFormProps {
    formData: CreateBranchRequest;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading: boolean;
    accountData?: {
        name: string;
        accountNumber: string;
        type: 'SAVINGS' | 'CURRENT';
        categoryId: number;
        description?: string;
        categoryName?: string;
    };
}

export interface ViewBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    branch: BranchResponse | null;
}

// Props para el modal de edición
export interface EditBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    branch: BranchResponse | null;
    onConfirm: (data: UpdateBranchDto) => Promise<void> | void;
    loading?: boolean;
}
