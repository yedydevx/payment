import { useAuthStore } from "@/store/auth.store";
import { useLayoutProfile } from "../hooks/useLayoutProfile";
import { Bell, MessageCircle, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutHeaderProps {
    title: string;
    onMenuClick?: () => void;
}

export const LayoutHeader = ({ title, onMenuClick }: LayoutHeaderProps) => {
    const { getDecryptedUser } = useAuthStore();
    const { displayName, getInitials } = useLayoutProfile();
    const user = getDecryptedUser();

    return (
        <div className="flex justify-between items-center w-full">
            {/* Header móvil: Logo + Título + Menú (< md) */}
            <div className="flex md:hidden items-center justify-between w-full bg-[#eef2ed] rounded-b-3xl p-4">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                        <div className="w-3 h-3 bg-[#2d524d] rounded-sm"></div>
                    </div>
                </div>

                {/* Título centrado */}
                <h1 className="text-xl font-bold text-[#2d524d] absolute left-1/2 transform -translate-x-1/2">
                    {title}
                </h1>

                {/* Menú hamburguesa */}
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    <Menu className="w-6 h-6 text-[#2d524d]" />
                </button>
            </div>

            {/* Header tablet y desktop: Título + Elementos del usuario (≥ md) */}
            <div className="hidden md:flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold text-[#2d524d]">{title}</h1>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#b9f09e] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#a8e08d] transition-colors duration-200">
                        <MessageCircle className="w-5 h-5 text-[#2d524d]" />
                    </div>

                    <div className="relative cursor-pointer">
                        <div className="w-10 h-10 bg-[#b9f09e] rounded-full flex items-center justify-center hover:bg-[#a8e08d] transition-colors duration-200">
                            <Bell className="w-5 h-5 text-[#2d524d]" />
                        </div>
                    </div>

                    <span className="hidden lg:block text-sm text-[#2d524d] font-semibold">{displayName}</span>

                    <Avatar className="w-10 h-10">
                        <AvatarImage src={(user as any)?.avatar} alt={displayName} />
                        <AvatarFallback className="bg-[#b9f09e] text-[#2d524d] font-semibold text-lg">
                            {getInitials((user as any)?.nombre, (user as any)?.apellido)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}
