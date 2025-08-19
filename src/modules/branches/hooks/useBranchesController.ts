import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { BranchResponse, UpdateBranchDto } from '../types/branches.types';
import { useBranches } from './useBranches';

type ViewType = 'list' | 'create' | 'edit';

export const useBranchesController = () => {
    const [currentView, setCurrentView] = useState<ViewType>('list');
    const [selectedBranch, setSelectedBranch] = useState<BranchResponse | null>(null);

    // Estados para los modales
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Obtener información del usuario logueado
    const { getDecryptedUser } = useAuthStore();
    const user = getDecryptedUser();

    // Hook para manejar sucursales
    const {
        branches,
        isLoading,
        totalBranches,
        refreshBranches,
        deleteBranch,
        updateBranch,
        isDeleting,
        isUpdating,
    } = useBranches();

    // Datos de la organización (desde el usuario logueado)
    const organizationName = user?.organization?.name || user?.name || "Mi Organización";
    const handleCreateBranch = () => {
        // setSelectedBranch(null); // Para edición futura
        setCurrentView('create');
    };

    const handleBackToList = () => {
        console.log('🏠 Navegando de vuelta a la lista...');
        setCurrentView('list');
        setSelectedBranch(null);
        console.log('✅ Vista cambiada a lista');
    };

    // Funciones para manejar las acciones de la tabla
    const handleViewBranch = (branch: BranchResponse) => {
        setSelectedBranch(branch);
        setIsViewModalOpen(true);
    };

    const handleEditBranch = (branch: BranchResponse) => {
        setSelectedBranch(branch);
        setIsEditModalOpen(true);
    };

    const handleDeleteBranch = (branch: BranchResponse) => {
        setSelectedBranch(branch);
        setIsDeleteModalOpen(true);
    };

    // Funciones para cerrar modales
    const handleCloseModals = () => {
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedBranch(null);
    };

    // Función para refrescar después de editar/eliminar
    const handleSuccessAction = () => {
        refreshBranches();
        handleCloseModals();
    };

    // Función para manejar la creación exitosa de una sucursal
    const handleBranchCreationSuccess = async () => {
        console.log('🔄 [SUCCESS] Iniciando proceso de éxito...');
        console.log('🔄 [SUCCESS] Refrescando lista de sucursales...');
        await refreshBranches();
        console.log('✅ [SUCCESS] Lista refrescada, esperando un momento...');
        // Pequeño delay para asegurar que el estado se actualice
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log('🏠 [SUCCESS] Navegando de vuelta...');
        handleBackToList();
        console.log('✅ [SUCCESS] Proceso completado');
    };

    // Confirmaciones para modales
    const confirmDelete = async () => {
        if (!selectedBranch) return;
        const ok = await deleteBranch(selectedBranch.id);
        if (ok) handleSuccessAction();
    };

    const confirmEdit = async (data: UpdateBranchDto) => {
        if (!selectedBranch) return;
        const ok = await updateBranch(selectedBranch.id, data);
        if (ok) handleSuccessAction();
    };

    return {
        // Datos de lista
        branches,
        isLoading,
        totalBranches,
        refreshBranches,
        // Estados
        currentView,
        selectedBranch,
        isViewModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        isDeleting,
        isUpdating,
        // Funciones
        handleCreateBranch,
        handleBackToList,
        handleViewBranch,
        handleEditBranch,
        handleDeleteBranch,
        handleCloseModals,
        handleSuccessAction,
        handleBranchCreationSuccess,
        confirmDelete,
        confirmEdit,
        // Datos
        organizationName,
    }

};


