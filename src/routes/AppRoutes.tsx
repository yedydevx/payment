import { useAuthStore } from "@/store/auth.store";
import { publicRoutes, privateRoutes } from "./routes";
import NotFound from "@/modules/notFound/NotFoundPage";
import LoginPage from "@/modules/auth/pages/auth.module";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

// Componente para manejar la redirección de la ruta raíz
const RootRedirect = () => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />;
};

// Agregar el componente RootRedirect a las rutas públicas
const routesWithRedirect: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <RootRedirect />,
            },
            ...(publicRoutes[0].children || [])
        ]
    },
    ...privateRoutes
];

const AppRoutes = createBrowserRouter([
    ...routesWithRedirect,
    // Ruta 404
    {
        path: "/404",
        element: <NotFound />,
    },
    // Catch all route for 404
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default AppRoutes;
