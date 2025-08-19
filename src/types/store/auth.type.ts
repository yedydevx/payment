export type Role = 'admin' | 'user' | 'superadmin' | 'SUPER_ADMIN' | 'ADMIN' | 'BRANCH_ADMIN' | 'BRANCH_USER' | 'CASHIER' | 'ACCOUNTANT';

export interface AreaInfo {
  id: number;
  nombre: string;
}

export interface AreaModulos {
  [key: string]: {
    activo: boolean;
    submodulos: string[];
  };
}

export interface User {
  email: string;
  nombre: string;
  apellido: string;
  identificacion: number;
  telefono?: string;
  roles: Role[];
  areas: AreaInfo[];
  area_modulos: AreaModulos;
  avatar?: string;
  cargo?: string;
}

export interface AuthState {
  user: any | null;
  token: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  setAuth: (user: any, accessToken: string, refreshToken?: string) => void;
  clearAuth: () => void;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  hasAllRoles: (roles: Role[]) => boolean;
  hasModuleAccess: (moduloId: string) => boolean;
  hasSubmoduleAccess: (moduloId: string, submoduloId: string) => boolean;
  getAvailableModules: () => string[];
  getAvailableSubmodules: (moduloId: string) => string[];
  getUserAreas: () => AreaInfo[];
  getDecryptedUser: () => any | null;
  getDecryptedToken: () => string | null;
  getDecryptedRefreshToken?: () => string | null;
  logout: () => void;
}

export interface UseProtectedRouteOptions {
  requiredRoles?: Role[];
  requireAllRoles?: boolean;
  requiredModule?: string;
  requiredSubmodule?: string;
}
