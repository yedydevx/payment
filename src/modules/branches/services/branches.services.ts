import {
    BranchResponse,
    CreateBranchRequest,
    BranchServiceResponse,
    BranchesServiceResponse,
} from "../types/branches.types";
import { api } from "@/config/axios";
import { ServiceResponse } from "@/types/services/services.type";

// Obtener todas las sucursales
// - SUPER_ADMIN: Ve todas las sucursales
// - ADMIN: Ve solo las sucursales de su organización
// - BRANCH_ADMIN: Ve solo su sucursal
export const getBranches = async (): Promise<BranchesServiceResponse> => {
    try {
        const response = await api.get("/branches");
        return {
            status: true,
            message: "Sucursales obtenidas exitosamente",
            data: response.data,
        };
    } catch (error: any) {
        console.error("Error al obtener sucursales:", error);
        return {
            status: false,
            message: error?.response?.data?.message || "Error al obtener las sucursales",
        };
    }
};

// Obtener una sucursal por ID
export const getBranchById = async (id: number): Promise<BranchServiceResponse> => {
    try {
        const response = await api.get(`/branches/${id}`);
        return {
            status: true,
            message: "Sucursal obtenida exitosamente",
            data: response.data,
        };
    } catch (error: any) {
        console.error(`Error al obtener sucursal ${id}:`, error);
        return {
            status: false,
            message: error?.response?.data?.message || "Error al obtener la sucursal",
        };
    }
};

// Crear nueva sucursal
// Solo SUPER_ADMIN y ADMIN pueden crear sucursales
// El organizationId se asigna automáticamente según el usuario autenticado
export const createBranch = async (branchData: CreateBranchRequest): Promise<BranchServiceResponse> => {
        try {
        const response = await api.post("/branches", branchData);

        return {
            status: true,
            message: "Sucursal creada exitosamente",
            data: response.data,
        };
    } catch (error: any) {
        console.error("Error al crear sucursal:", error);
        return {
            status: false,
            message: error?.response?.data?.message || "Error al crear la sucursal",
        };
    }
};

// Actualizar sucursal existente
export const updateBranch = async (id: number, branchData: Partial<CreateBranchRequest>): Promise<BranchServiceResponse> => {
    try {
        const response = await api.patch(`/branches/${id}`, branchData);
        return {
            status: true,
            message: "Sucursal actualizada exitosamente",
            data: response.data,
        };
    } catch (error: any) {
        return {
            status: false,
            message: error?.response?.data?.message || "Error al actualizar la sucursal",
        };
    }
};

// Eliminar sucursal
export const deleteBranch = async (id: number): Promise<ServiceResponse> => {
    try {
        await api.delete(`/branches/${id}`);
        return {
            status: true,
            message: "Sucursal eliminada exitosamente",
        };
    } catch (error: any) {
        return {
            status: false,
            message: error?.response?.data?.message || "Error al eliminar la sucursal",
        };
    }
};

// Marcar sucursal como principal
// Esto desmarcará automáticamente otras sucursales principales de la misma organización
export const setPrimaryBranch = async (id: number): Promise<BranchServiceResponse> => {
    try {
        const response = await updateBranch(id, { isPrimary: true });
        return response;
    } catch (error: any) {
        console.error(`Error al marcar sucursal ${id} como principal:`, error);
        throw error;
    }
};

// Validar datos de sucursal antes de enviar
export const validateBranchData = (branchData: CreateBranchRequest | Partial<CreateBranchRequest>): string[] => {
    const errors: string[] = [];

    if ('name' in branchData && branchData.name) {
        if (branchData.name.length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }
        if (branchData.name.length > 100) {
            errors.push('El nombre no puede tener más de 100 caracteres');
        }
    }

    if (branchData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(branchData.email)) {
            errors.push('El formato del email no es válido');
        }
    }

    if (branchData.phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(branchData.phone)) {
            errors.push('El formato del teléfono no es válido');
        }
    }

    if (branchData.code) {
        if (branchData.code.length < 2 || branchData.code.length > 20) {
            errors.push('El código debe tener entre 2 y 20 caracteres');
        }
    }

    return errors;
};

// Filtrar sucursales por criterios (lado cliente)
export const filterBranches = (
    branches: BranchResponse[],
    filters: {
        organizationId?: number;
        isPrimary?: boolean;
        search?: string;
    }
): BranchResponse[] => {
    let filtered = [...branches];

    if (filters.organizationId) {
        filtered = filtered.filter(branch => branch.organizationId === filters.organizationId);
    }

    if (filters.isPrimary !== undefined) {
        filtered = filtered.filter(branch => branch.isPrimary === filters.isPrimary);
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(branch =>
            branch.name.toLowerCase().includes(searchLower) ||
            branch.code?.toLowerCase().includes(searchLower) ||
            branch.city?.toLowerCase().includes(searchLower) ||
            branch.address?.toLowerCase().includes(searchLower)
        );
    }

    return filtered;
};

// Obtener estadísticas de sucursales
export const getBranchStats = (branches: BranchResponse[]) => {
    return {
        total: branches.length,
        primary: branches.filter(b => b.isPrimary).length,
        withEmail: branches.filter(b => b.email).length,
        withPhone: branches.filter(b => b.phone).length,
        withAddress: branches.filter(b => b.address).length,
        byCity: branches.reduce((acc, branch) => {
            if (branch.city) {
                acc[branch.city] = (acc[branch.city] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>)
    };
};
