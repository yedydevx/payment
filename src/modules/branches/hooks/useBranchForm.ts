import {
    BranchFormData,
    CreateBranchRequest
} from '../types/branches.types';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { createBranch } from '../services/branches.services';
import { createPaymentAccount, getPaymentCategories } from '@/modules/payment-accounts/services/payment-accounts.services';
import { TypeAccount, PaymentCategory } from '@/modules/payment-accounts/types/payment.types';
import { useEffect } from 'react';

// Datos iniciales
const initialBranchData: BranchFormData = {
    name: '',
    code: '',
    isPrimary: false,
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Colombia',
    postalCode: ''
};

const initialState = {
    branchData: initialBranchData as BranchFormData,
    errors: {} as Record<string, string>,
    isLoading: false,
};

export const useBranchForm = () => {
    const [state, setState] = useState(initialState);
    const { getDecryptedUser } = useAuthStore();
    const user = getDecryptedUser();

    // Estado para cuenta de cobro de la sede
    const [accountEnabled, setAccountEnabled] = useState<boolean>(true);
    const [accountName, setAccountName] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [accountType, setAccountType] = useState<TypeAccount>(TypeAccount.SAVINGS);
    const [accountCategoryId, setAccountCategoryId] = useState<number | undefined>(undefined);
    const [accountDescription, setAccountDescription] = useState<string>('');
    const [categories, setCategories] = useState<PaymentCategory[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await getPaymentCategories();
                setCategories(list);
            } catch (e) {
                // no-op
            }
        })();
    }, []);

    // Actualizar datos
    const updateBranchData = (data: BranchFormData) => {
        setState(prev => ({
            ...prev,
            branchData: data,
            errors: {},
        }));
    };

    const updateBranchField = <K extends keyof BranchFormData>(field: K, value: BranchFormData[K]) => {
        setState(prev => ({
            ...prev,
            branchData: { ...prev.branchData, [field]: value },
            errors: { ...prev.errors, [field as string]: '' },
        }));
    };

    // Validaciones
    const validateBranchData = (data: BranchFormData): Record<string, string> => {
        const errors: Record<string, string> = {};

        if (!data.name.trim()) {
            errors.name = 'El nombre de la sucursal es requerido';
        }

        if (!data.code.trim()) {
            errors.code = 'El código de la sucursal es requerido';
        } else if (data.code.length < 2) {
            errors.code = 'El código debe tener al menos 2 caracteres';
        }

        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Ingresa un email válido';
        }

        if (!data.city.trim()) {
            errors.city = 'La ciudad es requerida';
        }

        if (!data.state.trim()) {
            errors.state = 'El departamento/estado es requerido';
        }

        return errors;
    };

    // Validar y setear errores; retorna boolean si es válido
    const validate = (): boolean => {
        const errors = validateBranchData(state.branchData);
        setState(prev => ({ ...prev, errors }));
        if (Object.keys(errors).length > 0) {
            toast.error('Por favor corrige los errores antes de continuar');
            return false;
        }
        if (accountEnabled && !accountCategoryId) {
            toast.error('Selecciona una categoría para la cuenta de cobro');
            return false;
        }
        return true;
    };

    // Enviar formulario con servicio real
    const handleSubmit = async () => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            // Preparar datos para el backend (solo datos de sucursal)
            const branchRequest: CreateBranchRequest = { ...state.branchData };

            const result = await createBranch(branchRequest);

            if (result.status) {
                toast.success('¡Sucursal creada exitosamente!');
                // Intentar crear cuenta de cobro si está habilitado
                try {
                    if (accountEnabled) {
                        const newBranchId = (result.data as any)?.id || (result.data as any)?.branch?.id;
                        if (newBranchId && user?.organizationId && accountCategoryId) {
                            const payload = {
                                name: accountName || `${state.branchData.name} - Cuenta`,
                                accountNumber: accountNumber || `${state.branchData.code || 'BR'}-${Date.now()}`,
                                type: accountType,
                                organizationId: user.organizationId,
                                branchId: newBranchId,
                                categoryId: accountCategoryId,
                                description: accountDescription,
                                isBranchAccount: true,
                                currencyCode: 'COP',
                                isActive: true,
                            } as any;
                            console.log('📦 [ACCOUNT CREATE] Payload:', payload);
                            const accRes = await createPaymentAccount(payload);
                            console.log('✅ [ACCOUNT CREATE] Response:', accRes);
                            toast.success('Cuenta de cobro creada');
                        } else {
                            toast.warning('No se creó la cuenta de cobro: faltan datos (categoría)');
                        }
                    }
                } catch (e: any) {
                    console.error('❌ [ACCOUNT CREATE] Error:', e?.message, e?.response?.status, e?.response?.data);
                    toast.error(e?.response?.data?.message || e?.message || 'No se pudo crear la cuenta de cobro');
                }

                return true;
            } else {
                toast.error(result.message || 'Error al crear la sucursal');
                return false;
            }
        } catch (error: any) {
            toast.error(error?.message || 'Error al crear la sucursal');
            return false;
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    // Reset formulario
    const resetForm = () => {
        setState(initialState);
        setAccountEnabled(true);
        setAccountName('');
        setAccountNumber('');
        setAccountType(TypeAccount.SAVINGS);
        setAccountCategoryId(undefined);
        setAccountDescription('');
    };

    // Generar código automático basado en el nombre
    const generateCode = (name: string) => {
        const cleanName = name.trim().toUpperCase();
        const words = cleanName.split(' ');

        if (words.length === 1) {
            return words[0].substring(0, 3);
        } else {
            return words.map(word => word.substring(0, 2)).join('').substring(0, 4);
        }
    };

    // Función para manejar la creación exitosa
    const handleSuccessfulCreation = async (onSuccess?: () => Promise<void> | void) => {
        console.log('✅ Sucursal creada exitosamente, ejecutando callback...');
        if (onSuccess) {
            console.log('🔄 Ejecutando onSuccess...');
            await onSuccess();
        }
        console.log('🧹 Ejecutando limpieza del formulario...');
        resetForm();
    };

    // Función para preparar los datos de la cuenta
    const getAccountData = () => {
        if (!accountCategoryId) return undefined;

        return {
            name: accountName || `${state.branchData.name} - Cuenta`,
            accountNumber: accountNumber || `${state.branchData.code || 'BR'}-${Date.now()}`,
            type: accountType,
            categoryId: accountCategoryId,
            description: accountDescription,
            categoryName: categories.find(c => c.id === accountCategoryId)?.name
        };
    };

    // Función para manejar la confirmación del modal
    const handleModalConfirm = async (
        onSuccess?: () => Promise<void> | void,
        onModalClose?: () => void
    ) => {
        console.log('📝 Enviando formulario de sucursal...');
        const ok = await handleSubmit();
        if (ok) {
            console.log('✅ Sucursal creada exitosamente, cerrando modal...');
            onModalClose?.();
            await handleSuccessfulCreation(onSuccess);
        } else {
            console.log('❌ Error al crear la sucursal');
        }
    };

    return {
        // Estado
        branchData: state.branchData,
        errors: state.errors,
        isLoading: state.isLoading,
        categories,
        // Estado cuenta de cobro
        accountEnabled,
        accountName,
        accountNumber,
        accountType,
        accountCategoryId,
        accountDescription,

        // Mutaciones de formulario
        updateBranchData,
        updateBranchField,
        setAccountEnabled,
        setAccountName,
        setAccountNumber,
        setAccountType,
        setAccountCategoryId,
        setAccountDescription,

        // Validación y submit
        validate,
        handleSubmit,
        resetForm,

        // Funciones de flujo
        handleModalConfirm,
        handleSuccessfulCreation,

        // Utilidades
        generateCode,
        getAccountData,
        organizationId: user?.organizationId || 0,
        organizationName: user?.organization?.name || user?.name || 'Mi Organización',
    };
};
