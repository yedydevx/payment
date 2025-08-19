import React, { useState } from 'react';
import { User, Plus, CreditCard, Globe, Send } from 'lucide-react';
import { Account } from "../data/Account";
import Modal from '@/components/ui/Modal';

export const IncomeTransferForm = () => {
    const [transferType, setTransferType] = useState<'local' | 'international'>('local');
    const [selectedPaymentAccount, setSelectedPaymentAccount] = useState<any>(null);
    const [selectedDestinationAccount, setSelectedDestinationAccount] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [transferMethod, setTransferMethod] = useState<string>('instant');
    const [note, setNote] = useState<string>('');
    const [showAccountSelector, setShowAccountSelector] = useState(false);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí implementarías la lógica para enviar la transferencia
        console.log('Transferencia enviada:', {
            transferType,
            selectedPaymentAccount,
            selectedDestinationAccount,
            amount,
            transferMethod,
            note
        });
    };

    return (
        <div className='w-full h-full border border-gray-200 rounded-lg p-4 flex flex-col gap-4'>
            <h3 className="text-lg font-semibold text-gray-800">Formulario de Transferencia</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tipo de transferencia */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Transferencia
                    </label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setTransferType('local')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                                transferType === 'local'
                                    ? 'border-[#2d524d] bg-[#2d524d] text-white'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <CreditCard className="w-4 h-4" />
                            Local
                        </button>
                        <button
                            type="button"
                            onClick={() => setTransferType('international')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                                transferType === 'international'
                                    ? 'border-[#2d524d] bg-[#2d524d] text-white'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <Globe className="w-4 h-4" />
                            Internacional
                        </button>
                    </div>
                </div>

                {/* Cuenta de pago */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cuenta de Pago
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowAccountSelector(true)}
                        className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {selectedPaymentAccount ? (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#b9f09e] rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-[#2d524d]" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-800 text-sm">{selectedPaymentAccount.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {selectedPaymentAccount.number_account} - {selectedPaymentAccount.type}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <span className="text-gray-500">Seleccionar cuenta de pago</span>
                        )}
                        <Plus className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                {/* Cuenta destino */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cuenta Destino
                    </label>
                    <input
                        type="text"
                        value={selectedDestinationAccount}
                        onChange={(e) => setSelectedDestinationAccount(e.target.value)}
                        placeholder="Número de cuenta destino"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                    />
                </div>

                {/* Monto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monto
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                    />
                </div>

                {/* Método de transferencia */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Método de Transferencia
                    </label>
                    <select
                        value={transferMethod}
                        onChange={(e) => setTransferMethod(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                    >
                        <option value="instant">Inmediata</option>
                        <option value="scheduled">Programada</option>
                        <option value="recurring">Recurrente</option>
                    </select>
                </div>

                {/* Nota/Descripción */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nota/Descripción
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Descripción de la transferencia..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d524d] focus:border-transparent"
                    />
                </div>

                {/* Botón enviar */}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2d524d] text-white rounded-lg hover:bg-[#1a3a35] transition-colors font-medium"
                >
                    <Send className="w-4 h-4" />
                    Enviar Transferencia
                </button>
            </form>

            {/* Modal para seleccionar cuenta de pago */}
            <Modal
                isOpen={showAccountSelector}
                onClose={() => setShowAccountSelector(false)}
                title="Seleccionar Cuenta de Pago"
                mode="view"
                customSize="max-w-md"
            >
                <div className="space-y-3">
                    {Account.map((account) => (
                        <div
                            key={account.id}
                            onClick={() => {
                                setSelectedPaymentAccount(account);
                                setShowAccountSelector(false);
                            }}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-[#b9f09e] rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-[#2d524d]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-800 text-sm">{account.name}</h4>
                                <p className="text-xs text-gray-500">
                                    {account.type} - {account.number_account}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-[#2d524d]">
                                    ${Math.floor(Math.random() * 1000000).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};
