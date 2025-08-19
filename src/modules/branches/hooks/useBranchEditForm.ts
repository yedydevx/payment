import { useState } from 'react';
import { BranchResponse, UpdateBranchDto } from '../types/branches.types';

export const useBranchEditForm = () => {
    const [formData, setFormData] = useState<UpdateBranchDto>({});

    const loadFromBranch = (branch: BranchResponse | null) => {
        if (!branch) {
            setFormData({});
            return;
        }

        // Obtener la primera cuenta de cobro si existe
        const paymentAccount = branch.paymentAccounts && branch.paymentAccounts.length > 0
            ? branch.paymentAccounts[0]
            : null;

        setFormData({
            name: branch.name,
            code: branch.code || '',
            isPrimary: branch.isPrimary,
            email: branch.email || '',
            phone: branch.phone || '',
            address: branch.address || '',
            city: branch.city || '',
            state: branch.state || '',
            country: branch.country || '',
            postalCode: branch.postalCode || '',
            // Campos de cuenta de cobro
            accountName: paymentAccount?.name || '',
            accountNumber: paymentAccount?.accountNumber || '',
            accountType: paymentAccount?.type || ''
        });
    };

    const setField = (field: keyof UpdateBranchDto, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const reset = () => setFormData({});

    return {
        formData,
        setField,
        loadFromBranch,
        reset,
    };
};


