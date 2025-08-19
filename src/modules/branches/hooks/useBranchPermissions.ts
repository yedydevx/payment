import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '../types/branches.types';

// Roles y permisos
export const ROLE_OPTIONS = [
  { value: UserRole.BRANCH_ADMIN, label: 'Administrador de Sucursal' },
  { value: UserRole.BRANCH_USER, label: 'Usuario de Sucursal' },
  { value: UserRole.CASHIER, label: 'Cajero' },
  { value: UserRole.ACCOUNTANT, label: 'Contador' },
  { value: UserRole.ADMIN, label: 'Administrador' },
  { value: UserRole.SUPER_ADMIN, label: 'Super Admin' },
 ] as const;

export const BRANCH_CREATOR_ROLES = [UserRole.SUPER_ADMIN, UserRole.ADMIN];
export const BRANCH_MANAGER_ROLES = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.BRANCH_ADMIN];

export type PermissionsLike = {
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canViewAll: boolean;
  canSetPrimary: boolean;
};

export const getBranchPermissions = (userRole?: string): PermissionsLike => {
  const role = userRole as UserRole;
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return { canCreate: true, canUpdate: true, canDelete: true, canViewAll: true, canSetPrimary: true };
    case UserRole.ADMIN:
      return { canCreate: true, canUpdate: true, canDelete: true, canViewAll: false, canSetPrimary: true };
    case UserRole.BRANCH_ADMIN:
      return { canCreate: false, canUpdate: true, canDelete: false, canViewAll: false, canSetPrimary: false };
    default:
      return { canCreate: false, canUpdate: false, canDelete: false, canViewAll: false, canSetPrimary: false };
  }
};

export const useBranchPermissions = () => {
  const { getDecryptedUser } = useAuthStore();
  const user = getDecryptedUser();

  // Tomamos el primer rol disponible (o uno por defecto)
  const primaryRole: string | undefined = Array.isArray(user?.roles) ? user?.roles?.[0] : undefined;

  const permissions: PermissionsLike = getBranchPermissions(primaryRole);

  const can = (action: keyof PermissionsLike) => permissions[action];

  return {
    role: primaryRole,
    permissions,
    can,
    canCreate: permissions.canCreate,
    canUpdate: permissions.canUpdate,
    canDelete: permissions.canDelete,
    canViewAll: permissions.canViewAll,
    canSetPrimary: permissions.canSetPrimary,
    // Helpers adicionales por rol
    isSuperAdmin: primaryRole === UserRole.SUPER_ADMIN,
    isAdmin: primaryRole === UserRole.ADMIN,
    isBranchAdmin: primaryRole === UserRole.BRANCH_ADMIN,
    isBranchManager: primaryRole ? BRANCH_MANAGER_ROLES.includes(primaryRole as UserRole) : false,
    canCreateBranchByRole: primaryRole ? BRANCH_CREATOR_ROLES.includes(primaryRole as UserRole) : false,
  };
};


