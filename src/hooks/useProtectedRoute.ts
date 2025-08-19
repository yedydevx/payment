import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { UseProtectedRouteOptions } from '@/types/store/auth.type';
import { useModulePermissions } from './useModulePermissions';

export const useProtectedRoute = ({
	requiredRoles = [],
	requireAllRoles = false,
	requiredModule,
	requiredSubmodule
}: UseProtectedRouteOptions = {}) => {
	const { isAuthenticated, hasAllRoles, hasAnyRole, token, getDecryptedUser } = useAuthStore();
	const { canAccessModule, canAccessSubmodule } = useModulePermissions();
	const location = useLocation();

	// Verificación estricta de autenticación
	if (!isAuthenticated || !token) {
		return {
			isAuthorized: false,
			redirectTo: '/auth' as const,
			state: { from: location }
		};
	}

	// Verificar si el token es válido
	const decryptedUser = getDecryptedUser();
	if (!decryptedUser) {
		return {
			isAuthorized: false,
			redirectTo: '/auth' as const,
			state: { from: location }
		};
	}

	// Verificar roles si se especifican
	if (requiredRoles.length > 0) {
		const hasRequiredRoles = requireAllRoles
			? hasAllRoles(requiredRoles)
			: hasAnyRole(requiredRoles);

		if (!hasRequiredRoles) {
			return {
				isAuthorized: false,
				redirectTo: '/404' as const
			};
		}
	}

	// Verificar permisos de módulos si se especifican
	if (requiredModule) {
		const hasModuleAccess = canAccessModule(requiredModule);

		if (!hasModuleAccess) {
			return {
				isAuthorized: false,
				redirectTo: '/404' as const
			};
		}

		// Verificar submódulo si se especifica
		if (requiredSubmodule) {
			const hasSubmoduleAccess = canAccessSubmodule(requiredModule, requiredSubmodule);

			if (!hasSubmoduleAccess) {
				return {
					isAuthorized: false,
					redirectTo: '/404' as const
				};
			}
		}
	}

	return {
		isAuthorized: true,
		redirectTo: '/' as const
	};
};
