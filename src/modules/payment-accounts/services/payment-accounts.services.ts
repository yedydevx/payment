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

