import { X } from 'lucide-react';
import { ModalMode } from '@/hooks/useModal';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    mode?: ModalMode;
    customSize?: string; // Prop opcional para tamaño personalizado
}

// Mapeo directo de modo a clases CSS - ¡Súper simple!
const MODAL_SIZES: Record<ModalMode, string> = {
    create: 'max-w-3xl',      // Upload/Create
    upload: 'max-w-xl',      // Upload
    edit: 'max-w-3xl',       // Edición - más grande
    delete: 'max-w-2xl',      // Eliminación
    view: 'max-w-2xl',       // Vista de detalles
};

// Estilos específicos por modo
const MODAL_STYLES: Record<ModalMode, { headerBg: string; titleColor: string; borderColor: string }> = {
    create: { headerBg: 'bg-[#3b82f6]/20', titleColor: 'text-[#1e3a8a]', borderColor: 'border-[#3b82f6]/30' },
    edit: { headerBg: 'bg-[#3b82f6]/20', titleColor: 'text-[#1e3a8a]', borderColor: 'border-[#3b82f6]/30' },
    delete: { headerBg: 'bg-[#3b82f6]/20', titleColor: 'text-[#1e3a8a]', borderColor: 'border-[#3b82f6]/30' },
    upload: { headerBg: 'bg-[#3b82f6]/20', titleColor: 'text-[#1e3a8a]', borderColor: 'border-[#3b82f6]/30' },
    view: { headerBg: 'bg-[#3b82f6]/20', titleColor: 'text-[#1e3a8a]', borderColor: 'border-[#3b82f6]/30' },
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    mode = 'create',
    customSize
}) => {
    if (!isOpen) return null;

    const sizeClass = customSize || MODAL_SIZES[mode];
    const styles = MODAL_STYLES[mode];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md bg-opacity-50 p-4">
            <div className={`bg-white rounded-xl ${sizeClass} w-full max-h-[90vh] flex flex-col relative shadow-xl overflow-hidden`}>
                {/* Header fijo con estilos por modo */}
                <div className={`flex items-center justify-between p-6 border-b ${styles.borderColor} ${styles.headerBg} rounded-t-xl`}>
                    <h2 className={`text-xl font-bold ${styles.titleColor}`}>{title}</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800 cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={onClose}
                    >
                        <X className='w-6 h-6' />
                    </button>
                </div>

                {/* Contenido con scroll */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    <div className="min-h-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
