import { useState } from 'react';
import { IncomeTransferForm } from "../components/IncomeTransferForm";
import { IncomeRecientTransfer } from "../components/IncomeRecientTransfer";
import { IncomeAvailableAccounts } from "../components/IncomeAvailableAccounts";
import { PaymentAccount } from "../data/Account";

export const IncomeModule = () => {
    const [selectedAccount, setSelectedAccount] = useState<PaymentAccount | null>(null);

    const handleAccountSelect = (account: PaymentAccount) => {
        setSelectedAccount(account);
        console.log('Cuenta seleccionada:', account);
    };

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='block lg:hidden'>
                <IncomeRecientTransfer />
            </div>

            <div className='flex flex-col  md:flex-row gap-4 justify-center'>
                <div className='w-full md:w-1/2 lg:w-1/3'>
                <IncomeAvailableAccounts
                    onAccountSelect={handleAccountSelect}
                    selectedAccount={selectedAccount}
                />
                </div>

                <div className='hidden lg:flex w-full md:w-1/2 lg:w-2/3  flex-col gap-4 border border-gray-200 rounded-lg p-4'>
                    <IncomeRecientTransfer />
                    <IncomeTransferForm
                        selectedPaymentAccount={selectedAccount}
                    />
                </div>

                <div className='block lg:hidden'>
                    <IncomeTransferForm
                        selectedPaymentAccount={selectedAccount}
                    />
                </div>
            </div>

        </div>
    )
}
