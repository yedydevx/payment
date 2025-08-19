## Módulo de Transacciones

Describe la visualización y análisis de transacciones, incluyendo filtros por sede, tarjetas de KPIs y tabla detallada.

### Objetivo

- Mostrar actividad transaccional con filtros por rol/sede.
- KPI de ingresos, pendientes y fallidas.
- Tabla con columnas amigables y formato local.

## Estructura de archivos relevante

- `src/modules/transactions/pages/transactions.modules.tsx`: página principal del módulo.
- `src/modules/transactions/hooks/useTransactions.ts`: carga, filtrado por contexto de usuario y refresh.
- `src/modules/transactions/hooks/useTransactionsCards.tsx`: KPIs derivadas.
- `src/modules/transactions/components/TransactionsCards.tsx`: tarjetas de métricas.
- `src/modules/transactions/components/TransactionsHeaderTable.tsx`: definición de columnas para la tabla.
- `src/modules/transactions/services/transactions.services.ts`: llamadas HTTP y filtrado avanzado por sede.
- `src/modules/transactions/types/transactions.types.ts`: tipos y enums.

## Flujo de UI y permisos

1. `TransactionsModule` determina si el usuario es de nivel organización vía `useRolePermissions()`.
2. Si es organización, carga lista de sedes (`/branches`) para un filtro opcional (Select).
3. Llama a `useTransactions(selectedBranchId)` para traer transacciones ya filtradas si aplica.
4. Renderiza:
   - `TransactionsCards` con KPIs.
   - `TableComponent` con columnas de `getTransactionColumns()` y paginación/filtros/hide columnas.

## Hook `useTransactions(branchIdFilter?)`

- Estado: `transactions`, `loading`, `error` y `refresh`.
- Determina filtro por sucursal:
  - Si `branchIdFilter` está definido, se usa ese valor.
  - Si el usuario es de organización, no se filtra por sucursal.
  - Si es de sucursal, se usa `getUserBranchId()`.
- Llama a `getTransactions(branchId)` y gestiona errores/carga.

## Servicio `getTransactions(branchId?)`

- Construye endpoint base: `GET /transactions` con `?branchId` si se pasa número.
- Si el usuario es de sucursal o se fuerza un `branchId`, intenta obtener `/branches` para normalizar y derivar:
  - `paymentAccounts` y `users` de la sede efectiva.
  - Filtra en frontend por `payment.paymentAccount.id` o `createdBy.id` pertenecientes a la sede.
- Si es organización, devuelve todas las transacciones.
- Errores: lanza `Error` con mensaje claro.

## Columnas de la tabla (`getTransactionColumns`)

Incluye, entre otras:

- **ID Transaccional**: `payment.id`.
- **Método de Pago**: chip coloreado (CREDITO/DÉBITO/Transferencia/Efectivo/PSE).
- **Estado**: chip (Pendiente/Exitoso/Completado/Fallido/Cancelado), tolerante a variaciones del backend.
- **Categoría**: `payment.paymentAccount.category.name`.
- **Monto** y **Comisión**: formateados a moneda local (`es-CO` y `currencyCode`).
- Datos del pagador: nombre, documento, email, teléfono.
- Referencia de pago y fecha.

## KPIs (`useTransactionsCards` y `TransactionsCards`)

- `totalIngresos`: suma de `amount` de estados exitosos.
- `transaccionesPendientes`: conteo por estado `PENDING`.
- `transaccionesFallidas`: conteo por estado `FAILED`.
- `categoriaMasUsada`: cálculo por frecuencia (disponible en el hook).
- Formateo de moneda con `Intl.NumberFormat('es-CO')`.

## Tipos y enums

Archivo: `src/modules/transactions/types/transactions.types.ts`.

- `TransactionType`, `TransactionStatus`, `isSuccessfulStatus(status)`.
- `Transaction`: estructura exacta devuelta por el backend y relaciones incluidas.
- `BaseColumn<T>`: utilitario para columnas compatible con `TableComponent`.

## Extender el módulo

- **Nuevas columnas**: añadir entrada en `getTransactionColumns()` con `id`, `header`, `accessorKey` y `cell`.
- **Nuevos filtros**: envolver `TableComponent` y pasar props de filtrado, o prefiltrar datos antes de pasarlos.
- **Métricas adicionales**: extender `useTransactionsCards` y pintar nuevas tarjetas en `TransactionsCards`.
- **Filtrado por rango de fechas**: agregar parámetros a `getTransactions` y query params (`from`, `to`) si el backend lo soporta.

## Ejemplos

### Filtrar por sede (solo nivel organización)

```tsx
<Select value={selectedBranchId?.toString()} onValueChange={(v) => setSelectedBranchId(v === '__all__' ? undefined : Number(v))}>
  {/* opciones */}
  <SelectItem value="__all__">Todas las sedes</SelectItem>
  {/* sedes */}
  {branches.map(b => <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>)}
 </Select>
```

### Refrescar programáticamente

```ts
const { refresh } = useTransactions();
await refresh();
```

## Notas

- Los endpoints usan la instancia `api` con baseURL configurable y auto-refresh de token.
- La página muestra total de transacciones en el header de la tabla y soporta paginación.



