import React from 'react';
import Modal from '@/components/ui/Modal';
import { getDisplayCity } from '../utils/location';
import { formatDateSpanish } from '@/utils/dateUtils';
import { MapPin, Mail, Building, CreditCard, Calendar } from 'lucide-react';
import { ViewBranchModalProps } from '../types/branches.types';

export const BranchesViewModal: React.FC<ViewBranchModalProps> = ({
    isOpen,
    onClose,
    branch
}) => {
    if (!branch) return null;

    const city = getDisplayCity(branch.city, branch.state);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Detalles de la Sucursal"
            mode="view"
            customSize="max-w-3xl"
        >
            <div className="space-y-8">
                {/* Sede Parroquial - Header principal */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="p-3 bg-gray-900 rounded-xl flex-shrink-0 hidden md:block">
                        <Building className="h-8 w-8 text-white " />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{branch.name}</h3>
                        {branch.code && (
                            <p className="text-base text-gray-600 font-medium">Código: {branch.code}</p>
                        )}
                    </div>
                </div>

                {/* Información de Contacto */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Mail className="h-5 w-5 text-gray-900" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Información de Contacto</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">Email:</span>
                                <span className="text-gray-900 font-medium">
                                    {branch.email || 'No definido'}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">Teléfono:</span>
                                <span className="text-gray-900 font-medium">
                                    {branch.phone || 'No definido'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ubicación */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <MapPin className="h-5 w-5 text-gray-900" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Ubicación</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">Dirección:</span>
                                <span className="text-gray-900 font-medium">
                                    {branch.address || 'No definida'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">Ciudad:</span>
                                <span className="text-gray-900 font-medium">
                                    {city}
                                    {!branch.city && branch.state && (
                                        <span className="text-xs text-blue-600 ml-2 font-medium">(estimada)</span>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">Estado:</span>
                                <span className="text-gray-900 font-medium">
                                    {branch.state || 'No definido'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">País:</span>
                                <span className="text-gray-900 font-medium">
                                    {branch.country || 'No definido'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cuenta de Cobro */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <CreditCard className="h-5 w-5 text-gray-900" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Cuenta de Cobro</h4>
                    </div>

                    {branch.paymentAccounts && branch.paymentAccounts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-600 min-w-[80px]">Nombre:</span>
                                        <span className="text-gray-900 font-medium">
                                            {branch.paymentAccounts[0].name || 'No definida'}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-600 min-w-[80px]">Número:</span>
                                        <span className="text-gray-900 font-medium">
                                            {branch.paymentAccounts[0].accountNumber || 'No definida'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <span className="text-sm font-medium text-gray-600 min-w-[80px]">Tipo:</span>
                                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-900">
                                    {(() => {
                                        const accountType = branch.paymentAccounts[0].type;
                                        switch (accountType) {
                                            case 'CORRIENTE':
                                            case 'CURRENT':
                                                return 'Cuenta Corriente';
                                            case 'AHORRO':
                                            case 'SAVINGS':
                                                return 'Cuenta de Ahorro';
                                            default:
                                                return accountType || 'No definido';
                                        }
                                    })()}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-gray-500 text-center font-medium">
                                No hay cuenta de cobro configurada para esta sucursal
                            </p>
                        </div>
                    )}
                </div>

                {/* Fecha de creación */}
                <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-gray-900" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Fecha de creación:</span>
                        <span className="text-gray-900 font-medium">
                            {formatDateSpanish(branch.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
