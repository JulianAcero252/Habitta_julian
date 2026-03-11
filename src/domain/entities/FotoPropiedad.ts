/* Property photo entity — maps to `fotospropiedad` table in Supabase */
export interface FotoPropiedad {
  idfoto: number;
  idpropiedad: number;
  url: string;
  orden: number | null;
  fechasubida: string | null;
}

/* Input type for creating a new photo record */
export type CreateFotoInput = Omit<FotoPropiedad, "idfoto" | "fechasubida">;

/* Max photos per account plan */
export const PHOTO_LIMIT = {
  free: 7,
  premium: 15,
} as const;

/* Max videos per account plan */
export const VIDEO_LIMIT = {
  free: 1,
  premium: 3,
} as const;

/* Allowed video MIME types */
export const VIDEO_TYPES = ["video/mp4"] as const;
