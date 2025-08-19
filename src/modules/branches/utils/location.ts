import { ROLE_OPTIONS } from "../hooks/useBranchPermissions";

export const stateToDefaultCity: Record<string, string> = {
  Antioquia: 'Medellín',
  Cundinamarca: 'Bogotá',
  'Valle del Cauca': 'Cali',
  Atlántico: 'Barranquilla',
  Santander: 'Bucaramanga',
  Bolívar: 'Cartagena',
};

export function getDisplayCity(city?: string | null, state?: string | null): string {
  if (city && city.trim()) return city;
  if (state && stateToDefaultCity[state]) return stateToDefaultCity[state];
  return 'Ciudad no definida';
}


export const COUNTRY_OPTIONS = [
  { value: 'Colombia', label: 'Colombia' },
  { value: 'México', label: 'México' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Perú', label: 'Perú' }
] as const;

export const COLOMBIA_STATES = [
  { value: 'Antioquia', label: 'Antioquia' },
  { value: 'Cundinamarca', label: 'Cundinamarca' },
  { value: 'Valle del Cauca', label: 'Valle del Cauca' },
  { value: 'Atlántico', label: 'Atlántico' },
  { value: 'Santander', label: 'Santander' },
  { value: 'Bolívar', label: 'Bolívar' },
  { value: 'Nariño', label: 'Nariño' },
  { value: 'Córdoba', label: 'Córdoba' },
  { value: 'Norte de Santander', label: 'Norte de Santander' },
  { value: 'Tolima', label: 'Tolima' }
] as const;

export type RoleCode = typeof ROLE_OPTIONS[number]['value'];
export type CountryCode = typeof COUNTRY_OPTIONS[number]['value'];
export type StateCode = typeof COLOMBIA_STATES[number]['value'];
