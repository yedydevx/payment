import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { ModuleConfig } from "@/types/routes/route.type";
import LoginPage from "@/modules/auth/pages/auth.module";
import { LayoutPrivate } from "@/layouts/components/LayoutPrivate";
import { BranchesModule } from "@/modules/branches/pages/branches.modules";
import { DashboardModule } from "@/modules/dashboard/pages/dashboard.module";
import { BranchesListPage } from "@/modules/branches/pages/branches-list.page";
import { BranchesFormPage } from "@/modules/branches/pages/branches-form.page";
import { TransactionsModule } from "@/modules/transactions/pages/transactions.modules";
import { IncomeModule } from "@/modules/payments/income/pages/income.module";
import { ExpensesModule } from "@/modules/payments/expenses/pages/expenses.module";

export const modules: ModuleConfig[] = [
    {
        path: "transacciones",
        roles: ['SUPER_ADMIN', 'ADMIN'],
        requireAll: false,
        element: <TransactionsModule />,
        children: []
    },
    {
        path: "sucursales",
        roles: ['SUPER_ADMIN', 'ADMIN'],
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
