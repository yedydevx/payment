import { Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BranchesFormPage } from "./branches-form.page";
import { BranchesViewModal } from "../components/BranchesViewModal";
import TableComponent from "@/components/shared/table.component";
import { BranchesEditModal } from "../components/BranchesEditModal";
import { useBranchesController } from "../hooks/useBranchesController";
import { getBranchesColumns } from "../components/BranchesTableHeader";
import { BranchesDeleteModal } from "../components/BranchesDeleteModal";
import { LoadingContainer } from "@/components/ui/LoadingSpinner";

export const BranchesPage = () => {

    const {
        // Lista
        branches,
        isLoading,
        totalBranches,

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
        handleBranchCreationSuccess,
        confirmDelete,
        confirmEdit,

        // Datos
        organizationName,
    } = useBranchesController();

    // Vista del formulario (crear/editar)
    if (currentView === 'create' || currentView === 'edit') {
        return (
            <BranchesFormPage
                onBack={handleBackToList}
                onSuccess={handleBranchCreationSuccess}
            />
        );
    }

    return (
        <LoadingContainer
            loading={isLoading}
            error={undefined}
            loadingText="Cargando sucursales..."
            height="h-96"
        >
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Carta Sede Principal */}
                    <div className="w-full bg-[#1e4841] p-6 rounded-2xl  shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white/80 mb-1">Sede Principal</p>
                                <p className="text-md lg:text-xl font-bold text-white leading-tight">
                                    {organizationName}
                                </p>
                            </div>
                            <div className="p-3 bg-[#b9f09e] rounded-xl border border-[#2d524d]">
                                <Building2 className="h-6 w-6 text-[#2d524d]" />
                            </div>
                        </div>
                    </div>

                    {/* Carta Total Sucursales */}
                    <div className="w-full bg-[#1e4841] p-6 rounded-2xl  shadow-lg">
                        {/* Elementos decorativos */}
                        <div className=" flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white/80 mb-1">Total Sucursales</p>
                                <p className="text-3xl font-black text-white">
                                    {isLoading ? (
                                        <span className="animate-pulse">...</span>
                                    ) : (
                                        totalBranches
                                    )}
                                </p>
                            </div>
                            <div className="p-3 bg-[#b9f09e] rounded-xl border border-[#2d524d]">
                                <Building2 className="h-6 w-6 text-[#2d524d]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg border shadow-sm">
                    <div className="p-4 border-b flex justify-between items-center">
                        <div className="flex flex-col ">
                            <h2 className="text-lg font-semibold text-gray-900">Lista de Sucursales</h2>
                            <p className="text-sm text-gray-600 hidden md:block">Gestiona y visualiza todas las sucursales de tu organización</p>
                        </div>
                        <Button
                            onClick={handleCreateBranch}
                            size="lg"
                            className="bg-[#2d524d] hover:bg-[#2d524d]/80 text-white gap-2 cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden md:block">Nueva Sucursal</span>
                        </Button>
                    </div>

                    <div className="p-4">
                        <TableComponent
                            data={branches}
                            columns={getBranchesColumns({
                                onView: handleViewBranch,
                                onEdit: handleEditBranch,
                                onDelete: handleDeleteBranch,
                            }) as any}
                            enableGlobalFilter={true}
                            enableColumnVisibility={true}
                            enableStatusFilter={false}
                        />
                    </div>
                </div>

                {/* Modales */}
                <BranchesViewModal
                    isOpen={isViewModalOpen}
                    onClose={handleCloseModals}
                    branch={selectedBranch}
                />

                <BranchesEditModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModals}
                    branch={selectedBranch}
                    loading={isUpdating}
                    onConfirm={confirmEdit}
                />

                <BranchesDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleCloseModals}
                    branch={selectedBranch}
                    loading={isDeleting}
                    onConfirm={confirmDelete}
                />
            </div>
        </LoadingContainer>
    );
};

export const BranchesListPage = BranchesPage;
