import { useDashboard } from "../hooks/useDashboard";
import { LoadingContainer } from "@/components/ui/LoadingSpinner";
import { DashboardCreditCard } from "../components/DashboardCreditCard";
import { DashboardDailyLimit } from "../components/DashboardDailyLimit";
import { DashboardSavingPlans } from "../components/DashboardSavingPlans";
import { DashboardTableRecient } from "../components/DashboardTableRecient";
import { DashboardActivityRecient } from "../components/DashboardActivityRecient";
import { DashboardCategoriesChart } from "../components/DashboardCategoriesChart";
import { DashboardTransactionStats } from "../components/DashboardTransactionStats";
import { DashboardSimpleRevenueChart } from "../components/DashboardSimpleRevenueChart";

export const DashboardModule = () => {

    const { stats, isLoading, error } = useDashboard();

    return (
        <LoadingContainer
            loading={isLoading}
            error={error || undefined}
            loadingText="Cargando estadísticas del dashboard..."
            height="h-96"
            className="p-6"
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
                    {/* Columna izquierda: Tarjeta de crédito + Límite Diario + Metas Financieras */}
                    <div className="w-full md:w-1/3 lg:w-1/4 space-y-4">
                        {/* Tarjeta de crédito */}
                        <DashboardCreditCard
                            totalAmount={stats.totalSuccessfulAmount}
                        />

                        <DashboardDailyLimit
                            dailyLimit={5000000}
                            spentAmount={stats.totalAmount}
                        />
                        <DashboardSavingPlans />
                    </div>

                    {/* Columna centro: Estadísticas + Gráfica de ingresos + Tabla de transacciones */}
                    <div className="w-full md:w-2/3 lg:w-1/2 space-y-4">
                        {/* Estadísticas de transacciones */}
                        <DashboardTransactionStats
                            totalSuccessful={stats.totalPayments}
                            totalPending={stats.totalPendingPayments}
                            totalFailed={stats.totalFailedPayments}
                            totalTransactions={stats.totalTransactions}
                        />

                        {/* Gráfica de ingresos */}
                        <DashboardSimpleRevenueChart transactions={stats.allTransactions} />

                        {/* Tabla de transacciones recientes */}
                        <DashboardTableRecient transactions={stats.allTransactions} />
                    </div>

                    {/* Columna derecha: Solo en Desktop - Gráfica de dona + Actividad reciente */}
                    <div className="hidden lg:block w-full md:w-1/4 space-y-4">
                        <DashboardCategoriesChart transactions={stats.allTransactions} />
                        <DashboardActivityRecient />
                    </div>
                </div>

                {/* Segunda fila: Solo en Tablet - Gráfica de dona + Actividad reciente */}
                <div className="flex flex-col md:flex-row lg:hidden gap-4">
                    {/* Gráfica de dona - Tablet: ocupa todo el espacio disponible */}
                    <div className="w-full md:w-2/3">
                        <DashboardCategoriesChart transactions={stats.allTransactions} />
                    </div>

                    {/* Actividad reciente - Tablet: ocupa el espacio restante */}
                    <div className="w-full md:w-1/3">
                        <DashboardActivityRecient />
                    </div>
                </div>
            </div>
        </LoadingContainer>
    )
}
