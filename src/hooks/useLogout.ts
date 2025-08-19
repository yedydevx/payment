import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

export const useLogout = () => {
	const navigate = useNavigate();
	const { clearAuth } = useAuthStore();

	const logout = () => {
		// Limpiar el estado de autenticación
		clearAuth();
		// Limpiar el historial de navegación
		window.history.pushState(null, '', '/auth');
		// Redirigir al usuario a la página de login
		navigate('/auth', { replace: true });
	};

	return { logout };
};
