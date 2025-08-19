import { apiAuth} from "@/config/axios";
import { LoginRequest, LoginResponse } from "@/modules/auth/types/auth.types";

export const authService = () => {

	const login = async (data: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await apiAuth.post("/auth/login", data);
            return { status: true, data: response.data, message: "Login exitoso" };
        } catch (error: any) {
            return { status: false, message: error.response?.data?.message || "Error desconocido", data: undefined };
        }
	}

	return {
		login,

	};
}

