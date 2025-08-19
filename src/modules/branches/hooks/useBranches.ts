import {
    getBranches,
    getBranchById,
    filterBranches,
    getBranchStats,
    setPrimaryBranch,
    validateBranchData,
    deleteBranch as deleteBranchService,
    createBranch as createBranchService,
    updateBranch as updateBranchService,
} from "../services/branches.services";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { BranchResponse, CreateBranchRequest } from "../types/branches.types";

export const useBranches = () => {
    const [branches, setBranches] = useState<BranchResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { getDecryptedUser } = useAuthStore();
    const user = getDecryptedUser();

    // Obtener sucursales
    const fetchBranches = async () => {
        setIsLoading(true);
        try {
            const result = await getBranches();
            if (result.status && result.data) {
                setBranches(result.data);
            } else {
                toast.error(result.message);
                setBranches([]);
            }
        } catch (error) {
            console.error("Error fetching branches:", error);
            toast.error("Error al cargar las sucursales");
            setBranches([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Obtener sucursal por ID
    const fetchBranchById = async (id: number) => {
        try {
            const result = await getBranchById(id);
            if (result.status && result.data) {
                return result.data;
            } else {
                toast.error(result.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching branch by ID:", error);
            toast.error("Error al cargar la sucursal");
            return null;
        }
    };

    // Crear sucursal
    const createBranch = async (branchData: Omit<CreateBranchRequest, 'organizationId'>) => {
        // Validar datos antes de enviar
        const validationErrors = validateBranchData(branchData);
        if (validationErrors.length > 0) {
            validationErrors.forEach(error => toast.error(error));
            return false;
        }

        if (!user?.organizationId) {
            toast.error("No se puede determinar la organización");
            return false;
        }

        setIsCreating(true);
        try {
            const result = await createBranchService({
                ...branchData,
                organizationId: user.organizationId,
            });

            if (result.status) {
                toast.success(result.message);
                await fetchBranches(); // Recargar lista
                return true;
            } else {
                toast.error(result.message);
                return false;
            }
        } catch (error) {
            console.error("Error creating branch:", error);
            toast.error("Error al crear la sucursal");
            return false;
        } finally {
            setIsCreating(false);
        }
    };

    // Actualizar sucursal
    const updateBranch = async (id: number, branchData: Partial<CreateBranchRequest>) => {
        // Validar datos antes de enviar
        const validationErrors = validateBranchData(branchData);
        if (validationErrors.length > 0) {
            validationErrors.forEach(error => toast.error(error));
            return false;
        }

        setIsUpdating(true);
        try {
            const result = await updateBranchService(id, branchData);

            if (result.status) {
                toast.success(result.message);
                await fetchBranches(); // Recargar lista
                return true;
            } else {
                toast.error(result.message);
                return false;
            }
        } catch (error) {
            console.error("Error updating branch:", error);
            toast.error("Error al actualizar la sucursal");
            return false;
        } finally {
            setIsUpdating(false);
        }
    };

    // Eliminar sucursal
    const deleteBranch = async (id: number) => {
        setIsDeleting(true);
        try {
            const result = await deleteBranchService(id);

            if (result.status) {
                toast.success(result.message);
                await fetchBranches(); // Recargar lista
                return true;
            } else {
                toast.error(result.message);
                return false;
            }
        } catch (error) {
            console.error("Error deleting branch:", error);
            toast.error("Error al eliminar la sucursal");
            return false;
        } finally {
            setIsDeleting(false);
        }
    };

    // Marcar sucursal como principal
    const markAsPrimary = async (id: number) => {
        setIsUpdating(true);
        try {
            const result = await setPrimaryBranch(id);
            if (result.status) {
                toast.success("Sucursal marcada como principal");
                await fetchBranches(); // Recargar lista
                return true;
            } else {
                toast.error(result.message);
                return false;
            }
        } catch (error) {
            console.error("Error setting primary branch:", error);
            toast.error("Error al marcar como principal");
            return false;
        } finally {
            setIsUpdating(false);
        }
    };

    // Filtrar sucursales
    const getFilteredBranches = (filters: {
        organizationId?: number;
        isPrimary?: boolean;
        search?: string;
    }) => {
        return filterBranches(branches, filters);
    };

    // Cargar sucursales al montar el componente
    useEffect(() => {
        if (user?.organizationId) {
            fetchBranches();
        }
    }, [user?.organizationId]);

    const totalBranches = branches.length;
    const activeBranches = branches.filter(branch => branch.isActive).length;
    const primaryBranch = branches.find(branch => branch.isPrimary);
    const branchStats = getBranchStats(branches);

    return {
        // Estado
        branches,
        isLoading,
        isCreating,
        isUpdating,
        isDeleting,

        // Datos computados
        totalBranches,
        activeBranches,
        primaryBranch,
        branchStats,

        // Funciones CRUD
        fetchBranches,
        fetchBranchById,
        createBranch,
        updateBranch,
        deleteBranch,

        // Funciones adicionales
        markAsPrimary,
        getFilteredBranches,

        // Refresh manual
        refreshBranches: fetchBranches,
    };
};
