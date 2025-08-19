import { useState } from "react";
import { toast } from "sonner";
import { FormLogin } from "@/modules/auth/types/auth.types";
import { authService } from "@/modules/auth/services/auth.services";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

const useAuth = () => {

	//hooks
	const setAuth = useAuthStore((state) => state.setAuth);
	const navigate = useNavigate();

	//services
	const { login } = authService();

	//state
	const [process, setProcess] = useState<number>(0);
	const [formLoginData, setFormLoginData] = useState<FormLogin>({ email: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
    const [component, setComponent] = useState<string>("login");
    const [authError, setAuthError] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);

	//methods

	// -> Manejador de procesos
	const handleProcess = async () => {
		switch (process) {
			case 0:
				processSubmitLogin();
				break;
		}
	}

	// -> Ejecutamos el formulario del login
    const processSubmitLogin = async () => {
		try {
			setIsLoading(true);
            // Aunque falten campos, marcamos errores para que el UI los muestre
            if (!formLoginData.email || !formLoginData.password) {
                // fuerza mostrar errores en UI
                // no llamamos API
                (window as any).dispatchEvent?.(new Event('force-validation'));
                return toast.error("Completa el formulario para continuar");
            }

            if (formLoginData.email && formLoginData.password) {
				const result = await login(formLoginData);
                if (result.status && result.data) {
                    setAuthError("");
                    setAuth(result.data.user, result.data.accessToken, result.data.refreshToken);
                    navigate("/dashboard");
                } else {
                    const msg = result.message?.toString() || "Error de login";
                    setAuthError(msg);
                    toast.error(msg.toUpperCase());
                }
			}
		} catch (error) {
			toast.error(error as string);
		} finally {
			setIsLoading(false);
		}
	}



		return {
		component,
		setComponent,
		isLoading,

		showPassword,
		setShowPassword,

		//state
		process,
		setProcess,
		formLoginData,
		setFormLoginData,

		//methods
        handleProcess,
        authError,
	};
};

export default useAuth;
