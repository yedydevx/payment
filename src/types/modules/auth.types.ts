import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { Control } from "react-hook-form";

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RecoverFormData {
    email: string
}

export interface NewPasswordFormData {
    password: string;
}

export interface RecoverOTPFormData {
    otp: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export interface loginComponentProps {
    isLoading: boolean;
    handleSubmitLogin: UseFormHandleSubmit<LoginFormData>;
    submitLogin: (data: LoginFormData) => void;
    setComponent: (component: string) => void;
    register: UseFormRegister<LoginFormData>;
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
}

export interface recoverComponentProps {
    isLoading: boolean;
    handleSubmitRecover: UseFormHandleSubmit<RecoverFormData>;
    submitRecover: (data: RecoverFormData) => void;
    register: UseFormRegister<RecoverFormData>;
    setComponent: (component: string) => void
    recoverStep: number
    errors?: FieldErrors<RecoverFormData>;
}

export interface RecoverOTPComponentProps {
    isLoading: boolean;
    handleSubmitOTP: UseFormHandleSubmit<RecoverOTPFormData>;
    submitOTP: (data: RecoverOTPFormData) => void;
    register: UseFormRegister<RecoverOTPFormData>;
    control: Control<RecoverOTPFormData>;
}

export interface NewPasswordComponentProps {
    isLoading: boolean;
    handleSubmitPassword: UseFormHandleSubmit<NewPasswordFormData>;
    submitPassword: (data: NewPasswordFormData) => void;
    register: UseFormRegister<NewPasswordFormData>;
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
}

