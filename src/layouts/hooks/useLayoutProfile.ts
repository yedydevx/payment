import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

export const useLayoutProfile = () => {
    const navigate = useNavigate();
    const { getDecryptedUser } = useAuthStore();
    const user = getDecryptedUser();

    // Iniciales seguras compatibles con user del backend
    const getInitials = (nombre?: string, apellido?: string) => {
        if (nombre || apellido) {
            const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : '';
            const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : '';
            const initials = `${firstInitial}${lastInitial}`;
            if (initials) return initials;
        }
        const base = (user as any)?.name || (user as any)?.email || 'GU';
        const parts = String(base).trim().split(/\s+/);
        const first = parts[0]?.[0] || 'G';
        const second = parts[1]?.[0] || 'U';
        return `${first}${second}`.toUpperCase();
    };

    const displayName = (() => {
        if (!user) return 'User';
        const u: any = user;
        if (u.nombre || u.apellido) {
            return `${u.nombre || ''} ${u.apellido || ''}`.trim();
        }
        return u.name || u.email || 'User';
    })();

    const rolesText = (() => {
        const roles = (user as any)?.roles;
        if (Array.isArray(roles)) return roles.join(', ');
        if (typeof roles === 'string') return roles;
        return 'Usuario';
    })();

    return {
        user,
        getInitials,
        displayName,
        rolesText,
        navigate
    };
}
