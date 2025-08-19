// Tipos para módulos y submódulos
export interface SubModule {
    id: number;
    name: string;
    path: string;
    title: string;
    requiredModule?: string;
    requiredSubmodule?: string;
}

export interface Module {
    id: number;
    name: string;
    icon?: React.ReactNode;
    path?: string;
    title?: string;
    requiredModule?: string;
    subMenu?: SubModule[];
}
