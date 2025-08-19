import { Role } from "@/types/store/auth.type";

export interface ModuleConfig {
	path: string;
	roles: Role[];
	requireAll: boolean;
	element: React.ReactNode;
	children: {
		index?: boolean;
		path?: string;
		element: React.ReactNode;
	}[];
}

export interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRoles?: Role[];
	requireAllRoles?: boolean;
	requiredModule?: string;
	requiredSubmodule?: string;
}
