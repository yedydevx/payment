import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { ModuleConfig } from "@/types/routes/route.type";
import LoginPage from "@/modules/auth/pages/auth.module";
import { LayoutPrivate } from "@/layouts/components/LayoutPrivate";
import { BranchesModule } from "@/modules/branches/pages/branches.modules";
import { IncomeModule } from "@/modules/payments/income/pages/income.module";
import { DashboardModule } from "@/modules/dashboard/pages/dashboard.module";
import { BranchesListPage } from "@/modules/branches/pages/branches-list.page";
import { BranchesFormPage } from "@/modules/branches/pages/branches-form.page";
import { ExpensesModule } from "@/modules/payments/expenses/pages/expenses.module";
import { TransactionsModule } from "@/modules/transactions/pages/transactions.modules";

export const modules: ModuleConfig[] = [
    {
        path: "transacciones", // ruta del módulo
        roles: ['SUPER_ADMIN', 'ADMIN', 'BRANCH_ADMIN', 'BRANCH_USER', 'CASHIER', 'ACCOUNTANT'], // todos los roles pueden ver transacciones
        requireAll: false, // si se requiere que todos los roles sean cumplidos para acceder al módulo
        element: <TransactionsModule />, // componente del módulo
        children: [] // hijos del módulo
    },
    {
        path: "sucursales",
        roles: ['SUPER_ADMIN', 'ADMIN'], // solo organizadores pueden gestionar sucursales
        requireAll: false,
        element: <BranchesModule />,
        children: [
            { index: true, element: <BranchesListPage /> },
            { path: "create", element: <BranchesFormPage onBack={() => {}} onSuccess={() => {}} /> },
        ]
    },
    {
        path: "ingresos",
        roles: ['SUPER_ADMIN', 'ADMIN'],
        requireAll: false,
        element: <IncomeModule />,
        children: []
    },
    {
        path: "egresos",
        roles: ['SUPER_ADMIN', 'ADMIN'],
        requireAll: false,
        element: <ExpensesModule />,
        children: []
    },
];

// Convertir módulos a rutas
const moduleRoutes = modules.map(module => ({
    path: module.path,
    element: (
        <ProtectedRoute requiredRoles={module.roles} requireAllRoles={module.requireAll}>
            {module.element}
        </ProtectedRoute>
    ),
    children: module.children
}));

// Rutas públicas
export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: "auth",
                element: <LoginPage />,
            },
        ],
    },
];

// Rutas privadas
export const privateRoutes: RouteObject[] = [
    {
        path: "/",
        element: (
            <Suspense>
                <ProtectedRoute>
                    <LayoutPrivate />
                </ProtectedRoute>
            </Suspense>
        ),
        children: [
            // Página principal
            {
                path: "dashboard",
                element: <DashboardModule />,
            },
            //Los demas modulos
            ...moduleRoutes
        ],
    },
];
