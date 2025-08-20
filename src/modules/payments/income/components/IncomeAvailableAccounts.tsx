import { useState, useMemo } from 'react';
import { User, Plus, Search } from 'lucide-react';
import { Account } from "../data/Account";

import { PaymentAccount } from '../data/Account';

interface IncomeAvailableAccountsProps {
    onAccountSelect: (account: PaymentAccount) => void;
    selectedAccount?: PaymentAccount | null;
}

export const IncomeAvailableAccounts: React.FC<IncomeAvailableAccountsProps> = ({ onAccountSelect, selectedAccount }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAccounts = useMemo(() => {
        return Account.filter(account =>
            account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.number_account.includes(searchTerm) ||
            account.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);


    return (
        <div className='w-full flex flex-col gap-4'>
            <h3 className="text-lg font-semibold text-gray-800">Cuentas Disponibles</h3>
            <div className="flex justify-between gap-2 items-center">
                {/* Barra de búsqueda */}
                <div className="relative w-full ">
                    <input
                        type="text"
                        placeholder="Buscar cuenta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <button
                    className="md:hidden w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-900/90 transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4 text-white" />
                </button>
            </div>

            {/* Lista de cuentas */}
            <div className="space-y-2 h-64 md:h-[650px] lg:h-[850px] overflow-y-auto">
                {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                        <div
                            key={account.id}
                            onClick={() => onAccountSelect(account)}
                            className={`p-3 bg-white rounded-lg border transition-all duration-200 cursor-pointer ${selectedAccount?.id === account.id
                                ? 'border-gray-900 bg-gray-50 shadow-md'
                                : 'border-gray-200 hover:shadow-sm hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {/* Información de la cuenta */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate">{account.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">
                                        {account.number_account}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {searchTerm ? 'No se encontraron cuentas que coincidan con la búsqueda' : 'No hay cuentas disponibles'}
                    </div>
                )}
            </div>
                <button
                    className="md:flex hidden  gap-2 w-full h-10 bg-gray-900 rounded-lg items-center justify-center hover:bg-gray-900/90 transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4 text-white" />
                    <span className='text-white'>Agregar Nueva Cuenta</span>
                </button>
        </div>
    );
};
