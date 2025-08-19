import React, { useState, useMemo } from 'react';
import { User, Plus, Search, Filter } from 'lucide-react';
import { Account } from "../data/Account";
import Modal from '@/components/ui/Modal';

export const IncomeAvailableAccounts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

        const filteredAccounts = useMemo(() => {
        return Account.filter(account =>
            account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.number_account.includes(searchTerm) ||
            account.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getTypeText = (type: string) => {
        return type === 'SAVINGS' ? 'Ahorros' : 'Corriente';
    };



    return (
        <div className='w-full h-full border border-gray-200 rounded-lg p-4 flex flex-col gap-4'>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Cuentas Disponibles</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-8 h-8 bg-[#2d524d] rounded-full flex items-center justify-center hover:bg-[#1a3a35] transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4 text-white" />
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar cuenta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#b9f09e] rounded-full flex items-center justify-center hover:bg-[#a8e08d] transition-colors">
                    <Filter className="w-3 h-3 text-[#2d524d]" />
                </button>
            </div>

            {/* Lista de cuentas */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                        <div key={account.id} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                            <div className="w-10 h-10 bg-[#b9f09e] rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-[#2d524d]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 text-sm truncate">{account.name}</h4>
                                <p className="text-xs text-gray-500 truncate">
                                    {account.number_account} - {account.type}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-[#2d524d]">
                                    ${Math.floor(Math.random() * 1000000).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {searchTerm ? 'No se encontraron cuentas que coincidan con la búsqueda' : 'No hay cuentas disponibles'}
                    </div>
                )}
            </div>

            {/* Modal para crear nueva cuenta */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Crear Nueva Cuenta"
                mode="create"
                customSize="max-w-sm"
            >
                <form className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de la cuenta
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                            placeholder="Ej: Cuenta Bancolombia"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de cuenta
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                            placeholder="Ej: 123-456789-01"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de cuenta
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent">
                            <option value="SAVINGS">Ahorros</option>
                            <option value="CURRENT">Corriente</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción (opcional)
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                            rows={2}
                            placeholder="Descripción de la cuenta..."
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-[#2d524d] text-white rounded-lg hover:bg-[#1a3a35] transition-colors"
                        >
                            Crear Cuenta
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
