import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLayoutProfile } from "../hooks/useLayoutProfile";

export const LayoutProfile = () => {
    const { displayName, getInitials } = useLayoutProfile();

    return (
        <Avatar className="w-10 h-10">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback className="bg-gray-900 text-gray-300 font-semibold text-lg">
                {getInitials("John", "Doe")}
            </AvatarFallback>
        </Avatar>
    );
};
