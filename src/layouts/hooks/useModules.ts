import { useState } from "react";
import { SubModule } from "../types/layout.type";

export const useModules = (id: number, subMenu: SubModule[], active: number, handleActive: (active: number) => void) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleClick = () => {
        console.log('Module clicked - id:', id, 'subMenu:', subMenu, 'subMenu length:', subMenu?.length);
        if (subMenu && subMenu.length > 0) {
            console.log('Opening/closing submenu');
            setIsSubMenuOpen(!isSubMenuOpen);
        } else {
            console.log('Calling handleActive with id:', id);
            handleActive(id);
        }
    };

    const handleSubMenuItemClick = (subItemId: number) => {
        handleActive(subItemId);
    };

    const isCurrentItemActive = active === id || (subMenu && subMenu.some(subItem => subItem.id === active));

    return { isSubMenuOpen, handleClick, handleSubMenuItemClick, isCurrentItemActive };
}
