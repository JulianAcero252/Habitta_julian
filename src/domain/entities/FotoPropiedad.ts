/** FotoPropiedad — tabla `fotospropiedad` en Supabase */
export interface FotoPropiedad {
  idfoto: number;
  idpropiedad: number;
  url: string;
  orden: number | null;
  fechasubida: string | null;
}

/** Crear foto — sin campo auto-generado */
export type CreateFotoInput = Omit<FotoPropiedad, "idfoto" | "fechasubida">;

/** Límite de fotos por tipo de cuenta */
export const LIMITE_FOTOS = {
  free: 7,
  premium: 15,
} as const;

/** Límite de videos por tipo de cuenta */
export const LIMITE_VIDEOS = {
  free: 1,
  premium: 3,
} as const;

/** Tipos de archivo de media permitidos */
export const TIPOS_IMAGEN = ["image/jpeg", "image/png", "image/webp"];
export const TIPOS_VIDEO = ["video/mp4"];
export const TIPOS_MEDIA = [...TIPOS_IMAGEN, ...TIPOS_VIDEO];

/** Tamaño máximo por archivo (bytes) */
export const MAX_SIZE_IMAGEN = 5 * 1024 * 1024;   // 5 MB
export const MAX_SIZE_VIDEO  = 50 * 1024 * 1024;  // 50 MB

