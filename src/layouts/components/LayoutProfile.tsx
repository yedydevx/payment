import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLayoutProfile } from "../hooks/useLayoutProfile";

export const LayoutProfile = () => {
    const { getDecryptedUser } = useAuthStore();
    const { getInitials, displayName } = useLayoutProfile();
    const currentUser = getDecryptedUser();

    if (!currentUser) return null;

    return (
        <div className="w-full">
            <div className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-100">
                <Avatar className="w-10 h-10 border-2 border-gray-200">
                    <AvatarImage src={(currentUser as any)?.avatar} alt={displayName || 'Usuario'} />
                    <AvatarFallback className="bg-[#2d524d] text-[#b9f09e] font-semibold">
                        {getInitials((currentUser as any)?.nombre, (currentUser as any)?.apellido)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {displayName || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {(currentUser as any)?.email || 'usuario@ejemplo.com'}
                    </p>
                </div>
            </div>
        </div>
    );
};
