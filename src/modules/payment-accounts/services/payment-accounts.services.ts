import { api } from '@/config/axios';
import { CreatePaymentAccountRequest, PaymentCategory } from '../types/payment.types';

export const createPaymentAccount = async (dto: CreatePaymentAccountRequest) => {
  const res = await api.post('/payment-accounts', dto);
  return res.data;
};

export const getPaymentCategories = async (): Promise<PaymentCategory[]> => {
  const res = await api.get('/payment-categories');
  return res.data || [];
};

// Obtener todas las cuentas de pago del usuario
// export const getPaymentAccounts = async (organizationId?: number, branchId?: number) => {
//   const params = new URLSearchParams();
//   if (organizationId) params.append('organizationId', organizationId.toString());
//   if (branchId) params.append('branchId', branchId.toString());

//   const res = await api.get(`/payment-accounts?${params.toString()}`);
//   return res.data || [];
// };


