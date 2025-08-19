import React from 'react';
import { BranchesForm } from '../components/BranchesForm';
import { BranchesFormProps } from '../types/branches.types';

export const BranchesFormPage: React.FC<BranchesFormProps> = ({ onBack, onSuccess }) => {
    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                <BranchesForm
                    onBack={onBack}
                    onSuccess={onSuccess}
                />
            </div>
        </div>
    );
};
