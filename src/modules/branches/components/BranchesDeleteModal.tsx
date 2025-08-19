import React from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { DeleteBranchModalProps } from '../types/branches.types';

export const BranchesDeleteModal: React.FC<DeleteBranchModalProps> = ({
    isOpen,
    onClose,
    branch,
    onConfirm,
    loading = false,
}) => {

    if (!branch) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirmar Eliminación"
            mode="delete"
            customSize="max-w-md"
        >
            <div className="space-y-6">
                {/* Icono de advertencia */}
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gray-900/20 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-gray-900" />
                    </div>
                </div>

                {/* Mensaje de confirmación */}
                <div className="text-center space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                        ¿Estás seguro de eliminar esta sucursal?
                    </h3>
                    <p className="text-sm text-gray-600">
                        Esta acción no se puede deshacer. Todos los datos asociados a esta sucursal se perderán permanentemente.
                    </p>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => onConfirm()}
                        disabled={loading}
                        className='bg-gray-900 text-white hover:bg-gray-900/90'
                    >
                        {loading ? 'Eliminando...' : 'Eliminar Sucursal'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
