import { useState } from "react";

// Hook reutilizable para manejar el estado del modal
export type ModalMode = 'create' | 'edit' | 'delete' | 'upload' | 'view';

export function useModal<T = any>() {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<ModalMode>('create');
    const [selected, setSelected] = useState<T | undefined>(undefined);

    const openModal = (modalMode: ModalMode, item?: T) => {
        setMode(modalMode);
        setSelected(item);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelected(undefined);
    };

    return {
        isOpen,
        mode,
        selected,
        openModal,
        closeModal,
    };
}
