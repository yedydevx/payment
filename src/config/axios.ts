import axios from "axios";
import { useAuthStore } from "@/store/auth.store";
import { useEncryption } from "@/hooks/useEncryption";

// Get API URL from environment or runtime config
export const URL = import.meta.env.VITE_API_URL || (window as any).ENV?.VITE_API_URL || 'https://paymentsbackend-production.up.railway.app';
const { decrypt } = useEncryption();

export const api = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Instancia específica para autenticación
export const apiAuth = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Nueva instancia para FormData
export const apiFormData = axios.create({
    baseURL: URL,
});

// --- Manejo centralizado de refresh para evitar múltiples llamadas simultáneas ---
let isRefreshing = false as boolean;
let refreshPromise: Promise<string | null> | null = null; // Resuelve con nuevo accessToken o null si falla

const performTokenRefresh = async (): Promise<string | null> => {
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }
    isRefreshing = true;
    const store = useAuthStore.getState();
    const encryptedRefreshToken = store.refreshToken;
    const { decrypt } = useEncryption();

    refreshPromise = (async () => {
        try {
            if (!encryptedRefreshToken) return null;
            const decryptedRefreshToken = decrypt(encryptedRefreshToken);
            if (!decryptedRefreshToken) return null;

            const refreshResponse = await axios.post(`${URL}/auth/refresh`, {
                refreshToken: decryptedRefreshToken,
            });

            const responseData = refreshResponse.data || {};
            const accessToken = responseData.accessToken as string | undefined;
            const newRefreshToken = responseData.refreshToken as string | undefined;
            const currentUser = store.getDecryptedUser?.() || null;
            const userData = responseData.user || currentUser;

            if (!accessToken) return null;

            // Persistir nuevos tokens
            store.setAuth(userData, accessToken, newRefreshToken);
            return accessToken;
        } catch {
            return null;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

// Interceptor para agregar el token en cada petición
api.interceptors.request.use((config) => {
    const store = useAuthStore.getState();
    const encryptedToken = store.token;

    if (encryptedToken) {
        // console.log('existe token')
        const decryptedToken = decrypt(encryptedToken);
        if (decryptedToken) {
            //   console.log('decryptedToken', decryptedToken)
            config.headers.Authorization = `Bearer ${decryptedToken}`;
        }
    }

    // Log básico para debugging si es necesario
    // console.log('🌐 Petición HTTP:', {
    //     method: config.method?.toUpperCase(),
    //     url: config.url,
    //     baseURL: config.baseURL,
    //     hasToken: !!config.headers.Authorization
    // });

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para agregar el token en cada petición de FormData
apiFormData.interceptors.request.use((config) => {
    const store = useAuthStore.getState();
    const encryptedToken = store.token;

    if (encryptedToken) {
        const decryptedToken = decrypt(encryptedToken);
        if (decryptedToken) {
            config.headers.Authorization = `Bearer ${decryptedToken}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar el deslogueo automático cuando el token vence
const handleTokenExpired = () => {
    try {
        const store = useAuthStore.getState();
        // Limpiar el estado de autenticación
        store.clearAuth();
        // Redirigir directamente a la ruta de autenticación
        window.location.replace('/auth');
    } catch (error) {
        // En caso de error, forzar redirección a auth
        console.error('Error durante el logout automático:', error);
        window.location.replace('/auth');
    }
};

// Interceptor de respuesta para api con auto-refresh (single-flight)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config || {};
        const status = error.response?.status;

        // Solo intentamos refresh una vez por request
        if ((status === 401 || status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await performTokenRefresh();
            if (newAccessToken) {
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            // Refresh definitivo falló -> cerrar sesión
            handleTokenExpired();
        }

        return Promise.reject(error);
    }
);

// Interceptor de respuesta para apiFormData con auto-refresh (single-flight)
apiFormData.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config || {};
        const status = error.response?.status;

        if ((status === 401 || status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await performTokenRefresh();
            if (newAccessToken) {
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiFormData(originalRequest);
            }
            handleTokenExpired();
        }

        return Promise.reject(error);
    }
);

