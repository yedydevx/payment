import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, Role } from '@/types/store/auth.type';
import { useEncryption } from '@/hooks/useEncryption';

// Crear una instancia de encriptación fuera del store
const { encrypt, decrypt } = useEncryption();

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
                        setAuth: (user: any, accessToken: string, refresh?: string) => {
                const encryptedUser = encrypt(user);
                const encryptedToken = encrypt(accessToken);
                const encryptedRefresh = refresh ? encrypt(refresh) : null;

                set({
                    user: encryptedUser,
                    token: encryptedToken,
                    refreshToken: encryptedRefresh,
                    isAuthenticated: true,
                });
            },
            clearAuth: () => {
                set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
            },
            logout: () => {
                set({ user: null, token: null, refreshToken: null, isAuthenticated: false });
                window.location.href = '/';
            },
            hasRole: (role: Role) => {
                const { user } = get();
                if (!user) return false;
                const decryptedUser = decrypt(user);
                // Verificar tanto los roles nuevos (códigos del backend) como los legacy
                const userRoles = decryptedUser?.roles || [];
                return userRoles.includes(role) ?? false;
            },
            hasAnyRole: (roles: Role[]) => {
                const { user } = get();
                if (!user) return false;
                const decryptedUser = decrypt(user);
                return decryptedUser?.roles?.some((role: Role) => roles.includes(role)) ?? false;
            },
            hasAllRoles: (roles: Role[]) => {
                const { user } = get();
                if (!user) return false;
                const decryptedUser = decrypt(user);
                return decryptedUser?.roles?.every((role: Role) => roles.includes(role)) ?? false;
            },
            // Permisos de módulos
            hasModuleAccess: (moduloId: string) => {
                const { user } = get();
                if (!user) return false;
                const decryptedUser = decrypt(user);
                const areaModulos = decryptedUser?.area_modulos;
                if (!areaModulos) return false;
                return areaModulos[moduloId]?.activo ?? false;
            },
            hasSubmoduleAccess: (moduloId: string, submoduloId: string) => {
                const { user } = get();
                if (!user) return false;
                const decryptedUser = decrypt(user);
                const areaModulos = decryptedUser?.area_modulos;
                if (!areaModulos || !areaModulos[moduloId]?.activo) return false;
                return areaModulos[moduloId]?.submodulos?.includes(submoduloId) ?? false;
            },
            getAvailableModules: () => {
                const { user } = get();
                if (!user) return [];
                const decryptedUser = decrypt(user);
                const areaModulos = decryptedUser?.area_modulos;
                if (!areaModulos) return [];
                return Object.keys(areaModulos).filter(moduloId => areaModulos[moduloId]?.activo);
            },
            getAvailableSubmodules: (moduloId: string) => {
                const { user } = get();
                if (!user) return [];
                const decryptedUser = decrypt(user);
                const areaModulos = decryptedUser?.area_modulos;
                if (!areaModulos || !areaModulos[moduloId]?.activo) return [];
                return areaModulos[moduloId]?.submodulos || [];
            },
            getUserAreas: () => {
                const { user } = get();
                if (!user) return [];
                const decryptedUser = decrypt(user);
                return decryptedUser?.areas || [];
            },
            getDecryptedUser: () => {
                const { user } = get();
                if (!user) return null;
                const decrypted = decrypt(user);
                return decrypted;
            },
            getDecryptedToken: () => {
                const { token } = get();
                if (!token) return null;
                const decrypted = decrypt(token);
                return decrypted;
            },
            getDecryptedRefreshToken: () => {
                const { refreshToken } = get();
                if (!refreshToken) return null;
                const decrypted = decrypt(refreshToken);
                return decrypted;
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => {
                return {
                    user: state.user,
                    token: state.token,
                    refreshToken: state.refreshToken,
                    isAuthenticated: state.isAuthenticated,
                };
            },
        }
    )
);
