/**
 * Tipos de propiedad válidos — coinciden con los valores usados en la columna `tipo`
 * de la tabla `propiedades` en Supabase.
 */
export const PropertyType = {
  CASA: "casa",
  APARTAMENTO: "apartamento",
  LOTE: "lote",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];
