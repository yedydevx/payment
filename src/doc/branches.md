## Módulo de Sucursales (Branches)

Esta documentación describe el módulo de sucursales: arquitectura, flujo de datos, hooks, componentes, servicios y cómo extenderlo.

### Objetivo

- **Gestión completa de sucursales**: listar, crear, editar, ver y eliminar.
- **Asignación de cuenta de cobro** a la sede al crearla.
- **Validaciones de datos** y feedback al usuario.

## Estructura de archivos relevante

- `src/modules/branches/pages/branches-list.page.tsx`: página principal de listado y acciones.
- `src/modules/branches/pages/branches.modules.tsx`: outlet del módulo para rutas anidadas.
- `src/modules/branches/hooks/useBranchesController.ts`: orquesta vista (lista/crear/editar) y modales.
- `src/modules/branches/hooks/useBranches.ts`: estado, CRUD y utilidades en memoria.
- `src/modules/branches/components/BranchesTableHeader.tsx`: definición de columnas de la tabla.
- `src/modules/branches/components/BranchesViewModal.tsx`: modal de detalle.
- `src/modules/branches/components/BranchesEditModal.tsx`: modal de edición.
- `src/modules/branches/components/BranchesDeleteModal.tsx`: confirmación de eliminación.
- `src/modules/branches/components/BranchesForm.tsx`: formulario de creación con resumen/confirmación.
- `src/modules/branches/services/branches.services.ts`: llamadas HTTP y helpers (validación, filtros, stats).
- `src/modules/branches/types/branches.types.ts`: tipos y DTOs del módulo.

## Flujo de UI y estados

1. La página `BranchesPage` obtiene estado y acciones desde `useBranchesController()`.
2. `useBranchesController` usa `useBranches()` para cargar datos y exponer CRUD, además maneja:
   - `currentView`: `'list' | 'create' | 'edit'`.
   - Modales: ver, editar, eliminar (`isViewModalOpen`, `isEditModalOpen`, `isDeleteModalOpen`).
   - `selectedBranch`: sucursal activa para acciones.
3. En vista `list` se renderiza:
   - Encabezado con nombre de organización del usuario (`organizationName`).
   - Tarjetas de resumen (sede principal y total de sedes).
   - Tabla `TableComponent` con columnas de `getBranchesColumns` y acciones.
   - Modales controlados (ver, editar, eliminar).
4. En vista `create` o `edit` se muestra `BranchesFormPage` (creación) o el modal de edición.
5. Tras confirmar acciones (crear/editar/eliminar) se refresca la lista y se cierran modales.

## Hooks clave

### `useBranches()`

- Estado: `branches`, `isLoading`, `isCreating`, `isUpdating`, `isDeleting`.
- CRUD:
  - `fetchBranches()`: GET `/branches`.
  - `fetchBranchById(id)`
  - `createBranch(data)`
  - `updateBranch(id, data)`
  - `deleteBranch(id)`
- Adicionales:
  - `markAsPrimary(id)`: marca como principal (PATCH a `isPrimary: true`).
  - `getFilteredBranches(filters)` y `branchStats`.
- Integra `useAuthStore` para obtener `organizationId` y mensajes con `sonner/toast`.

### `useBranchesController()`

- Maneja la navegación entre vistas y el ciclo de vida de modales.
- Expone funciones: `handleCreateBranch`, `handleBackToList`, `handleViewBranch`, `handleEditBranch`, `handleDeleteBranch`, `confirmEdit`, `confirmDelete`, `handleBranchCreationSuccess`.
- Obtiene `organizationName` del usuario logueado.

## Componentes principales

### Tabla y columnas

- `getBranchesColumns(actions?)` define columnas como: Nombre, Código, Correo, Teléfono, Dirección, Ubicación, Cuenta de Cobro, Fecha de creación, y Acciones.
- Usa utilidades: `getDisplayCity` y `formatDateSpanish`.
- Las acciones disparan callbacks pasados por `BranchesPage` (ver/editar/eliminar).

### Modales

- `BranchesViewModal`: información de contacto, ubicación y cuenta de cobro (si existe), con formato de tipos de cuenta.
- `BranchesEditModal`: formulario editable con validaciones visuales; usa `useBranchEditForm` para estado (carga desde `branch` en `useEffect`).
- `BranchesDeleteModal`: confirmación con advertencias, especialmente si la sede es principal.

### Formulario de creación (`BranchesForm`)

- Se apoya en `useBranchForm` (estado, validaciones, generación de código, info de organización) y lista de categorías de cuenta de cobro.
- Datos de sede: nombre, código (auto si se desea), email, teléfono, país/departamento/ciudad, postal, dirección.
- Cuenta de cobro: nombre, referencia, tipo (`SAVINGS`/`CURRENT`), categoría y descripción.
- Muestra info del usuario administrador creado automáticamente (rol de sede) con contraseña temporal.
- Confirmación: abre `Modal` y renderiza `BranchesSummaryForm` para revisar y confirmar.

## Servicios y endpoints

Archivo: `src/modules/branches/services/branches.services.ts`.

- `getBranches()`: GET `/branches`.
- `getBranchById(id)`: GET `/branches/:id`.
- `createBranch(dto)`: POST `/branches`.
- `updateBranch(id, dto)`: PATCH `/branches/:id`.
- `deleteBranch(id)`: DELETE `/branches/:id`.
- `setPrimaryBranch(id)`: helper que usa `updateBranch` para activar `isPrimary`.
- `validateBranchData(data)`: validación de nombre, email, teléfono y código.
- `filterBranches(list, filters)`: filtrado cliente por `organizationId`, `isPrimary` y `search`.
- `getBranchStats(list)`: totales, conteos por ciudad y campos presentes.

Todas las llamadas usan `api` de `src/config/axios.ts` (con baseURL configurable y manejo de tokens y auto-refresh).

## Tipos y DTOs

Archivo: `src/modules/branches/types/branches.types.ts`.

- `CreateBranchDto`, `UpdateBranchDto`.
- `BranchResponse`: modelo extendido con relaciones opcionales (`organization`, `paymentAccounts`, `users`).
- `CreateBranchFormData` con pasos del formulario.
- `BranchStats`, `BranchFilters` y permisos por rol (`UserRole`).

## Permisos y roles (referencia)

- Comentarios indican visibilidad por rol:
  - `SUPER_ADMIN`: ve todas las sedes, puede crear/editar/eliminar.
  - `ADMIN`: ve sedes de su organización, puede crear/editar/eliminar.
  - `BRANCH_ADMIN`: ve y gestiona su sede.

El backend impone reglas; el frontend asume permisos vía store/roles.

## Extender el módulo

- **Agregar columna en tabla**: editar `getBranchesColumns` y añadir una entrada con `id`, `header`, `accessorKey` y `cell`.
- **Nuevos campos del formulario**: actualizar `useBranchForm`, `BranchesForm`, `validateBranchData` y los DTOs.
- **Acción adicional**: agregar item en el menú de acciones (dropdown) y manejar en `useBranchesController`.

## Ejemplos de uso

### Navegar a crear sede

```tsx
// En `BranchesPage`
<Button onClick={handleCreateBranch}>Nueva Sucursal</Button>
```

### Confirmar edición desde modal

```tsx
<BranchesEditModal isOpen={isEditModalOpen} onConfirm={confirmEdit} loading={isUpdating} />
```

### Eliminar sede

```tsx
const ok = await deleteBranch(selectedBranch.id);
if (ok) refreshBranches();
```

## Notas

- El nombre de la organización se obtiene del usuario logueado (`useAuthStore`).
- La tabla permite filtro global y visibilidad de columnas.
- Se proveen toasts de éxito/error para cada operación.


