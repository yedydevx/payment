import { useState } from "react";
import { FormLogin } from "../types/auth.types";

export const useFormLogin = (formLoginData: FormLogin, setFormLoginData: (data: FormLogin) => void) => {
    // State
    const [showPassword, setShowPassword] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [emailError, setEmailError] = useState<string>("");

    // Validación del formulario
    const validateForm = (data: FormLogin): boolean => {
        let valid = true;
        setEmailError("");
        // Email requerido y con formato válido
        const email = data.email.trim();
        if (!email) {
            setEmailError("El correo electrónico es requerido");
            valid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError("Ingresa un correo electrónico válido");
                valid = false;
            }
        }
        // Password requerido
        if (data.password.trim() === '') {
            valid = false;
        }
        setShowErrors(!valid);
        return valid;
    };

    const handleInputChange = (field: 'email' | 'password', value: string) => {
        setFormLoginData({ ...formLoginData, [field]: value });

        // Ocultar errores cuando el usuario comienza a escribir
        if (showErrors && value.trim()) {
            setShowErrors(false);
        }
    };

    return {
        // State
        showPassword,
        setShowPassword,
        showErrors,
        setShowErrors,
        emailError,

        // Methods
        validateForm,
        handleInputChange,
    }
}

