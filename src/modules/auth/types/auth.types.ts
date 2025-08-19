import { ServiceResponse } from "@/types/services/services.type";

// -> Login
export type LoginRequest = FormLogin;
export interface LoginResponse extends ServiceResponse {
    data?: { user: any; accessToken: string; refreshToken: string };
}

// -> Formulario de login
export interface FormLoginProps {
    formLoginData: FormLogin
    isLoading: boolean;
    setFormLoginData: (data: FormLogin) => void;
    showPassword: boolean;
    setShowPassword: (v: boolean) => void;
    showErrors: boolean;
    emailError?: string;
    handleInputChange: (field: 'email' | 'password', value: string) => void;
}
export interface FormLogin{
    email: string;
    password: string;
}
