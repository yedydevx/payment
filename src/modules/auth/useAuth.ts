import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormData, NewPasswordFormData, RecoverFormData, RecoverOTPFormData } from "@/types/modules/auth.types";
import { authService } from "./services/auth.services";

const useAuth = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [component, setComponent] = useState<string>("login");
    const [showPassword, setShowPassword] = useState(false);
    const [recoverStep, setRecoverStep] = useState<number>(1);

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
    } = useForm<LoginFormData>();

    const {
        register: registerRecover,
        handleSubmit: handleSubmitRecover,
        formState: { errors: errorsRecover },
    } = useForm<RecoverFormData>();

    const {
        register: registerRecoverOTP,
        handleSubmit: handleSubmitRecoverOTP,
        control: controlRecoverOTP,
        formState: { errors: errorsRecoverOTP },
    } = useForm<RecoverOTPFormData>();

    const {
        register: registerNewPassword,
        handleSubmit: handleSubmitNewPassword,
        formState: { errors: errorsNewPassword },
    } = useForm<NewPasswordFormData>();

    const service = authService();

    const submitLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const res = await service.login({
                email: data.email,
                password: data.password
            });
            console.log('res', res);
            toast.success("Login simulado");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Error inesperado durante el login");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        component,
        setComponent,
        isLoading,
        registerLogin,
        handleSubmitLogin,
        errorsLogin,
        submitLogin,
        showPassword,
        setShowPassword,
        // submitRecover,
        registerRecover,
        handleSubmitRecover,
        errorsRecover,
        recoverStep,
        setRecoverStep,
        // submitRecoverOTP,
        registerRecoverOTP,
        handleSubmitRecoverOTP,
        controlRecoverOTP,
        errorsRecoverOTP,
        // submitNewPassword,
        registerNewPassword,
        handleSubmitNewPassword,
        errorsNewPassword
    };
};

export default useAuth;
