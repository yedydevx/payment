import { useState } from 'react';
import { CreditCard, Globe, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AccountDestination, DestinationAccount } from '../data/AccountDestination';
import { Label } from '@/components/ui/label';

// Tipos TypeScript
interface PaymentAccount {
    id: number;
    name: string;
    type: string;
    number_account: string;
    bank: string;
    card_type: string;
    expiry: string;
    cvv: string;
}



interface IncomeTransferFormProps {
    selectedPaymentAccount: PaymentAccount | null;
}

export const IncomeTransferForm: React.FC<IncomeTransferFormProps> = ({ selectedPaymentAccount }) => {
    const [transferType, setTransferType] = useState<'nacional' | 'internacional'>('nacional');
    const [selectedDestinationAccount, setSelectedDestinationAccount] = useState<string>('');
    const [destinationAccounts] = useState<DestinationAccount[]>(AccountDestination);
    const [amount, setAmount] = useState<string>('');
    const [note, setNote] = useState<string>('');

        // Función para validar y limpiar input monetario
    const handleAmountChange = (value: string): string => {
        // Solo permitir números y un punto decimal
        let cleanValue = value.replace(/[^\d.]/g, '');

        // Permitir solo un punto decimal
        const parts = cleanValue.split('.');
        if (parts.length <= 2) {
            // Limitar a 2 decimales
            if (parts[1] && parts[1].length > 2) {
                parts[1] = parts[1].substring(0, 2);
                cleanValue = parts.join('.');
            }
            return cleanValue;
        }
        return cleanValue;
    };

    return (
        <div className='w-full h-auto border border-gray-200 rounded-lg p-4 bg-gray-100'>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Formulario de Transferencia</h3>
            {/* Tipo de transferencia */}
            <div className='flex flex-col gap-3 mb-3'>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant={transferType === 'nacional' ? 'default' : 'outline'}
                        onClick={() => setTransferType('nacional')}
                        className="flex-1 gap-2"
                    >
                        <CreditCard className="w-4 h-4" />
                        Nacional
                    </Button>
                    <Button
                        type="button"
                        variant={transferType === 'internacional' ? 'default' : 'outline'}
                        onClick={() => setTransferType('internacional')}
                        className="flex-1 gap-2"
                    >
                        <Globe className="w-4 h-4" />
                        Internacional
                    </Button>
                </div>

                {/* Cuenta de pago */}
                <div className="space-y-2">
                    <Label className="block text-sm font-medium text-gray-700">
                        Cuenta de Pago
                    </Label>

                    {selectedPaymentAccount ? (
                        <div className="w-[300px] h-52 md:w-[350px] lg:w-[420px] md:h-54 lg:h-60 bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 md:p-6 text-white shadow-lg mx-auto">
                            {/* Header de la tarjeta */}
                            <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
                                <div>
                                    <h4 className="text-md md:text-lg font-semibold text-gray-200">{selectedPaymentAccount.name}</h4>
                                    <p className="text-sm text-gray-400">{selectedPaymentAccount.type}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Información principal */}
                            <div className="flex items-baseline gap-2 justify-between mb-6 lg:mb-8">
                                <span className="text-xl md:text-3xl font-bold text-gray-100">
                                    {amount ? `$${parseFloat(amount).toLocaleString()}` : '--'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-400">{selectedPaymentAccount.card_type}</p>
                                </div>
                            </div>


                            {/* Detalles de la tarjeta */}
                            <div className="space-y-3 flex justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Número de tarjeta</p>
                                    <p className="text-sm font-semibold text-gray-200">
                                        **** **** **** {selectedPaymentAccount.number_account.slice(-4)}
                                    </p>
                                </div>

                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">EXP</p>
                                        <p className="text-sm font-semibold text-gray-200">{selectedPaymentAccount.expiry}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">CVV</p>
                                        <p className="text-sm font-semibold text-gray-200">{selectedPaymentAccount.cvv}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Estado cuando no hay cuenta seleccionada
                        <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CreditCard className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">Selecciona una cuenta de pago</p>
                            <p className="text-gray-400 text-sm mt-1">
                                Ve arriba y haz clic en una cuenta disponible
                            </p>
                        </div>
                    )}
                </div>

                {/* Cuenta destino */}
                <div className="space-y-2">
                    <Label className="block text-sm font-medium text-gray-700">
                        Cuenta Destino
                    </Label>
                    <Select value={selectedDestinationAccount} onValueChange={setSelectedDestinationAccount}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar cuenta destino" />
                        </SelectTrigger>
                        <SelectContent>
                            {destinationAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id.toString()}>
                                    {account.name} - {account.number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Monto */}
                <div className="space-y-2">
                    <Label className="block text-sm font-medium text-gray-700">
                        Monto
                    </Label>

                    {/* Montos sugeridos */}
                    <div className="space-y-2">
                        <Label className="block text-xs font-medium text-gray-600">
                            Montos sugeridos
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                            {[20000, 50000, 100000, 200000].map((suggestedAmount) => (
                                <Button
                                    key={suggestedAmount}
                                    type="button"
                                    variant={amount === suggestedAmount.toString() ? 'default' : 'outline'}
                                    onClick={() => setAmount(suggestedAmount.toString())}
                                    className="text-sm font-medium transition-all duration-200"
                                >
                                    {suggestedAmount.toLocaleString()}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Monto personalizado */}
                    <div className="relative">
                        <Label className="block text-xs font-medium text-gray-600 mb-2">
                            Monto personalizado
                        </Label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                $
                            </div>
                            <Input
                                type="text"
                                value={amount}
                                onChange={(e) => {
                                    const cleanValue = handleAmountChange(e.target.value);
                                    setAmount(cleanValue);
                                }}
                                placeholder="0.00"
                                className="pl-8 pr-10"
                            />
                            {amount && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setAmount('')}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                    title="Limpiar monto"
                                >
                                    ✕
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Nota/Descripción */}
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Nota/Descripción
                    </Label>
                    <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Descripción de la transferencia..."
                        rows={3}
                        className='resize-none h-20'
                    />
                </div>
            </div>

            {/* Botón enviar */}
            <Button
                type="submit"
                disabled={!selectedPaymentAccount || !selectedDestinationAccount || !amount}
                className="w-full gap-2"
                size="lg"
            >
                <Send className="w-4 h-4" />
                {!selectedPaymentAccount || !selectedDestinationAccount || !amount
                    ? 'Completar formulario'
                    : 'Enviar Transferencia'
                }
            </Button>
        </div>
    );
};
