## ZetaPay Frontend (Demo)

Aplicación web (demo) para gestionar pagos y visualizar métricas. Incluye autenticación, dashboard con indicadores, listado de transacciones y administración de sucursales.

### Características

- Autenticación con persistencia segura (Zustand + cifrado) y refresh de token automático.
- Dashboard: totales, estados de pagos, métodos de pago y recientes.
- Transacciones: tabla filtrable/ordenable y KPIs.
- Sucursales: listado, creación, edición, eliminación y cuenta de cobro.
- Rutas protegidas por roles y layout privado.
- i18n (es/en) y componentes UI con Tailwind + Radix.

---

## Tech stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS 4 (plugin `@tailwindcss/vite`) + Radix UI + lucide-react
- Axios (interceptores para auth/refresh)
- React Router DOM 7
- Zustand (store de auth con cifrado)
- TanStack Table 8 (tablas)
- Recharts (gráficas) y SVG personalizado

---

## Estructura de carpetas (resumen)

```
src/
  assets/                 # imágenes, fuentes
  components/
    shared/               # componentes compartidos (tabla)
    ui/                   # componentes UI (botón, modal, inputs, etc.)
  config/
    axios.ts              # instancia axios, interceptores, refresh token
  hooks/                  # hooks globales (permisos, logout, modal, etc.)
  i18n/                   # configuración y archivos de traducción
  layouts/                # layouts privados/públicos y header/sidebar
  modules/
    auth/                 # login y servicios de autenticación
    dashboard/            # dashboard: hooks, servicios y componentes
    branches/             # sucursales: páginas, hooks, servicios, tipos
    transactions/         # transacciones: páginas, hooks, servicios, tipos
  routes/                 # definición de rutas públicas/privadas y protección
  services/               # servicios base
  store/
    auth.store.ts         # store de auth (persistente con cifrado)
  types/                  # tipos compartidos
  utils/                  # utilidades (fechas, userContext, etc.)
  main.tsx                # punto de entrada (RouterProvider, Toaster)
index.html                # HTML base, carga opcional de config runtime
```

Alias de imports: `@` apunta a `src/` (configurado en `vite.config.ts` y `tsconfig.json`).

---

## Variables de entorno

El frontend necesita la URL del backend.

- Build-time (recomendado):
  - Crear `./.env.local` con:
    ```env
    VITE_API_URL=https://tu-backend.com
    ```

- Runtime (opcional, sin recompilar):
  - Crear `public/config.js` con:
    ```js
    window.ENV = {
      VITE_API_URL: 'https://tu-backend.com'
    };
    ```
  - `index.html` ya intenta cargar `/config.js`.

La instancia axios usa `VITE_API_URL` o `window.ENV.VITE_API_URL`, y por defecto `https://paymentsbackend-production.up.railway.app` si no se define.

---

## Scripts

En `package.json`:

- `dev`: inicia Vite en modo desarrollo (con `--host` para acceso LAN).
- `build`: compila TypeScript y bundle de producción.
- `preview`: sirve el build localmente.
- `lint`: ejecuta ESLint.

Ejemplos:

```bash
# instalar dependencias
yarn install

# desarrollo
yarn run dev

# compilar y previsualizar
yarn build
yarn run preview

# lint
yarn run lint
```

Requisitos sugeridos: Node.js 20+.

---

## Autenticación y permisos

- `store/auth.store.ts`: guarda usuario y tokens en localStorage de forma cifrada.
- Interceptores en `config/axios.ts`:
  - Adjuntan `Authorization: Bearer <token>` en cada request.
  - Auto-refresh del access token con `/auth/refresh` (single-flight) y logout si falla.
- `routes/ProtectedRoute.tsx`: protege rutas y valida roles requeridos.
- `hooks/useRolePermissions.ts`: helpers para chequear roles y obtener `branchId` desde JWT o usuario.

---

## Rutas y módulos

- `routes/routes.tsx`: define rutas públicas (login) y privadas (dashboard, módulos).
- `routes/AppRoutes.tsx`: crea el router, redirección raíz según `isAuthenticated`.
- Módulos incluidos:
  - `dashboard`: métricas y recientes.
  - `transactions`: tabla con filtros y KPIs.
  - `branches`: CRUD de sucursales y cuenta de cobro (solo `SUPER_ADMIN`/`ADMIN`).

---

## Estilos y UI

- Tailwind CSS 4 + Radix UI.
- Componentes UI reutilizables en `components/ui` y `components/shared`.
- i18n inicializado en `src/i18n` (es/en), idioma por defecto: español.

---

## Cómo levantar el proyecto

1) Crear `.env.local` o `public/config.js` con `VITE_API_URL` del backend.

2) Instalar dependencias:

```bash
yarn
```

3) Ejecutar en desarrollo:

```bash
yarn run dev
```

4) Abrir en el navegador la URL indicada por Vite (por ejemplo, `http://localhost:5173`).

---

## Notas

- Es un demo: los datos y flujos están orientados a pruebas y validación visual/funcional.


