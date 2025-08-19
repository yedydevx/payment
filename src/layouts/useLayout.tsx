import {
    LuHouse,
    LuArrowLeftRight,
    LuBuilding,
    // LuCreditCard,
    // LuDollarSign,
    // LuShoppingCart,
} from "react-icons/lu";
import { useMemo } from "react";
import { Module, SubModule } from "./types/layout.type";
import { useLocation, useNavigate } from "react-router-dom";
import { useRolePermissions } from "@/hooks/useRolePermissions";

const usePrivateLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { canAccessBranches } = useRolePermissions();

    // Configuración centralizada de módulos y títulos
    const allModules: Module[] = [
        {
            id: 1, // id de la ruta
            name: "Dashboard", // nombre del módulo
            icon: <LuHouse />, // icono del módulo
            path: "/dashboard", // ruta del módulo
            title: "Dashboard" // titulo del módulo
        },
        {
            id: 2,
            name: "Transacciones",
            icon: <LuArrowLeftRight />,
            path: "/transacciones",
            title: "Transacciones"
        },
        {
            id: 3,
            name: "Sucursales",
            icon: <LuBuilding />,
            path: "/sucursales",
            title: "Sucursales"
        },
        // {
        //     id: 4,
        //     name: "Pagos",
        //     icon: <LuCreditCard />,
        //     title: "Pagos",
        //     subMenu: [
        //         {
        //             id: 41,
        //             name: "Ingresos",
        //             path: "/ingresos",
        //             title: "Ingresos",
        //             icon: <LuDollarSign />
        //         },
        //         {
        //             id: 42,
        //             name: "Egresos",
        //             path: "/egresos",
        //             title: "Egresos",
        //             icon: <LuShoppingCart />
        //         }
        //     ]
        // }
    ];

    // Filtrar módulos según permisos del usuario
    const modules: Module[] = useMemo(() => {
                return allModules.filter((module) => {
            // Si es el módulo de sucursales (id: 3), verificar permisos
            if (module.id === 3) {
                return canAccessBranches;
            }
            // Otros módulos están disponibles para todos
            return true;
        });
    }, [canAccessBranches]);

    // Obtener el título basado en la ruta actual
    const getTitle = () => {
        const flatModules: SubModule[] = [];
        modules.forEach((module) => {
            if (module.path) {
                flatModules.push(module as SubModule);
            } else if (Array.isArray(module.subMenu)) {
                module.subMenu.forEach((subItem) => flatModules.push(subItem));
            }
        });
        const currentModule = flatModules.find((mod) => mod.path === location.pathname);
        return currentModule?.title || "Dashboard";
    };

    const title = getTitle();

    // Calcular el módulo activo basado en la ruta actual
    const getActiveModule = () => {
        for (const module of modules) {
            if (module.path === location.pathname) {
                return module.id;
            }
            if (Array.isArray(module.subMenu)) {
                const subItem = module.subMenu.find((subItem) => subItem.path === location.pathname);
                if (subItem) {
                    return subItem.id;
                }
            }
        }
        return 1; // Dashboard por defecto
    };

    const active = getActiveModule();

    // Función para manejar el cambio de módulo
    const handleActive = (option: number) => {
        console.log('handleActive called with option:', option);

        // Buscar el módulo o submódulo seleccionado
        let selectedItem: Module | SubModule | null = null;

        for (const module of modules) {
            if (module.id === option) {
                selectedItem = module;
                break;
            }
            if (Array.isArray(module.subMenu)) {
                selectedItem = module.subMenu.find((subItem) => subItem.id === option) || null;
                if (selectedItem) break;
            }
        }

        // Navegar si se encontró un elemento con ruta
        if (selectedItem && 'path' in selectedItem && selectedItem.path) {
            console.log('Navigating to:', selectedItem.path);
            navigate(selectedItem.path);
        } else if (selectedItem && !('path' in selectedItem) && Array.isArray(selectedItem.subMenu)) {
            // Si es un módulo con submódulos pero sin ruta propia, no navegar
            console.log('Module with submodules - no navigation needed');
        } else {
            console.log('No path found for option:', option);
        }
    };



    return {
        active,
        handleActive,
        modules,
        title,
    };
};

export default usePrivateLayout;
