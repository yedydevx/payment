export interface LayoutSidebarProps {
    active: number;
    handleActive: (active: number) => void;
    modules: Module[];
    onClose?: () => void;
}

export interface LayoutHeaderProps {
    title: string;
    onMenuClick?: () => void;
}

export interface SubModule {
    id: number;
    name: string;
    path: string;
    title: string;
    icon?: React.ReactNode;
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

export interface ModulesProps {
    active: number;
    handleActive: (active: number) => void;
    id: number;
    name: string;
    icon: React.ReactNode;
    subMenu?: SubModule[];
}
