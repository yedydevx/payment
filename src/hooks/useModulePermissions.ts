import { useAuthStore } from '@/store/auth.store';
import { useMemo } from 'react';

export const useModulePermissions = () => {
  const {
    hasModuleAccess,
    hasSubmoduleAccess,
    getAvailableModules,
    getAvailableSubmodules,
    getUserAreas,
    isAuthenticated
  } = useAuthStore();

  // Memoizar los módulos disponibles para evitar recálculos innecesarios
  const availableModules = useMemo(() => {
    return isAuthenticated ? getAvailableModules() : [];
  }, [isAuthenticated, getAvailableModules]);

  // Función para verificar acceso a un módulo
  const canAccessModule = (moduloId: string) => {
    if (!isAuthenticated) return false;
    return hasModuleAccess(moduloId);
  };

  // Función para verificar acceso a un submódulo
  const canAccessSubmodule = (moduloId: string, submoduloId: string) => {
    if (!isAuthenticated) return false;
    return hasSubmoduleAccess(moduloId, submoduloId);
  };

  // Función para obtener submódulos disponibles de un módulo
  const getModuleSubmodules = (moduloId: string) => {
    if (!isAuthenticated) return [];
    return getAvailableSubmodules(moduloId);
  };

  // Función para verificar si el usuario tiene acceso a cualquier módulo
  const hasAnyModuleAccess = () => {
    return availableModules.length > 0;
  };

  // Función para verificar si el usuario tiene acceso a múltiples módulos
  const hasAccessToModules = (modules: string[]) => {
    return modules.some(moduleId => canAccessModule(moduleId));
  };

  // Función para verificar si el usuario tiene acceso a todos los módulos especificados
  const hasAccessToAllModules = (modules: string[]) => {
    return modules.every(moduleId => canAccessModule(moduleId));
  };

  // Función para obtener áreas del usuario
  const userAreas = useMemo(() => {
    return isAuthenticated ? getUserAreas() : [];
  }, [isAuthenticated, getUserAreas]);

  return {
    // Funciones de verificación
    canAccessModule,
    canAccessSubmodule,
    hasAnyModuleAccess,
    hasAccessToModules,
    hasAccessToAllModules,

    // Funciones para obtener datos
    getModuleSubmodules,
    availableModules,
    userAreas,

    // Estado
    isAuthenticated
  };
};
