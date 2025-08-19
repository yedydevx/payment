## Módulo de Dashboard

Panel con métricas agregadas, tendencias y desglose por métodos de pago. Esta guía cubre flujo, hooks, servicios y cómo extenderlo.

### Objetivo

- Proveer una vista ejecutiva de transacciones: totales, estados, métodos y recientes.
- Resumen por periodos (mes, 15 días, 5 días).

## Estructura de archivos relevante

- `src/modules/dashboard/pages/dashboard.module.tsx`: composición del dashboard.
- `src/modules/dashboard/hooks/useDashboard.ts`: estado principal de estadísticas y helpers.
- `src/modules/dashboard/services/dashboard.services.ts`: cálculo de estadísticas a partir de transacciones.
- `src/modules/dashboard/hooks/useDashboardAnalyticsDays.ts`: cálculos por ventanas de tiempo.
- `src/modules/dashboard/hooks/useDashboardPaymentMethodsChart.tsx`: datos y SVG de dona por método de pago.
- Componentes:
  - `DashboardTransactionTotal.tsx`: tarjeta principal + recientes.
  - `DashboardRecentTransactions.tsx`: listado de últimas transacciones con estado.
  - `DashboardPaymentMethodsChart.tsx`: dona + leyenda.
  - `DashboardAnalyticsDays.tsx`: resumen mensual, 15 días y 5 días.

## Flujo de datos

1. `DashboardModule` consume `useDashboard()` para obtener `stats`, `isLoading` y helpers.
2. `useDashboard()` llama a `dashboardService.getDashboardStats()` al montar.
3. El servicio:
   - Obtiene contexto de usuario con `getUserContext()` para decidir filtrado por sede.
   - Llama a `getTransactions(branchId?)` del módulo de transacciones.
   - Calcula: totales, pendientes, fallidas, montos agregados, método de pago más usado y recientes.
4. Las métricas se distribuyen a componentes hijos para visualización.

## Estadísticas provistas (`DashboardStats`)

- `totalTransactions`, `totalAmount`.
- `totalPayments` (exitosas), `totalPendingPayments`, `totalFailedPayments`.
- `totalSuccessfulAmount`, `totalPendingAmount`.
- `mostUsedPaymentMethod`: `{ method, count, percentage }`.
- `recentTransactions`: últimas 5.
- `allTransactions`: fuente para gráficas.

## Helpers de formato/estado

- `formatCurrency(amount)`: `Intl.NumberFormat('es-CO', { currency: 'COP' })`.
- `getStatusText(status)`: mapea a etiquetas en español, tolera variantes exitosas.
- `getStatusColor(status)`: color según estado.

## Resúmenes por periodo (`useDashboardAnalyticsDays`)

- `lastMonthIncome`, `last15DaysIncome`, `last5DaysIncome`: `{ amount, count }` filtrando por estados exitosos y fecha de creación.

## Métodos de pago (`useDashboardPaymentMethodsChart`)

- Calcula distribución por método con `count` y `percentage`.
- Asigna color y etiqueta de visualización.
- Genera un SVG de dona (`createDonutChart(size?)`).

## Extender el dashboard

- **Nuevas métricas**: ampliar `dashboardService.getDashboardStats()` y reflejar en `DashboardStats` y componentes.
- **Filtros temporales**: agregar parámetros a `getDashboardStats()` y propagar a `getTransactions()` con query params.
- **Gráficas adicionales**: crear nuevo hook selector (ej. barras por categoría) y componente visual.

## Ejemplos

### Uso básico en la página

```tsx
const { stats, formatCurrency, getStatusText } = useDashboard();
<DashboardTransactionTotal
  totalSuccessfulAmount={stats.totalSuccessfulAmount}
  totalTransactions={stats.totalTransactions}
  totalSuccessfulPayments={stats.totalPayments}
  totalPendingPayments={stats.totalPendingPayments}
  totalFailedPayments={stats.totalFailedPayments}
  formatCurrency={formatCurrency}
  recentTransactions={stats.recentTransactions}
  getStatusText={getStatusText}
/>
```

### Gráfica de métodos de pago

```tsx
<DashboardPaymentMethodsChart transactions={stats.allTransactions} />
```

## Notas

- El servicio reutiliza el filtrado por sede del módulo de transacciones para mantener consistencia de permisos.
- El dashboard está optimizado para respuesta rápida; cálculos se hacen en cliente con datos crudos del backend.



