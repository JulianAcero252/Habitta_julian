/**
 * Interfaz de Propiedad — coincide exactamente con la tabla `propiedades` en Supabase.
 * Los campos opcionales (nullable) se representan con `| null`.
 */
export interface Property {
  idpropiedad: number;
  idusuario: number;
  titulo: string | null;
  descripcion: string | null;
  tipo: string | null;
  precio: number | null;
  habitaciones: number | null;
  banos: number | null;
  area: number | null;
  estado: string | null;
  estrato: number | null;
  estado_publicacion: string | null;
  fechacreacion: string | null;
}

/**
 * Tipo para crear una propiedad nueva.
 * Excluye `idpropiedad` (auto-generado por Supabase),
 * `estado_publicacion` y `fechacreacion` (gestionados por triggers).
 */
export type CreatePropertyInput = Omit<
  Property,
  "idpropiedad" | "estado_publicacion" | "fechacreacion"
>;

/**
 * Tipo para actualizar una propiedad existente.
 * Todos los campos son opcionales excepto el id.
 */
export type UpdatePropertyInput = Partial<
  Omit<Property, "idpropiedad" | "estado_publicacion" | "fechacreacion">
>;
