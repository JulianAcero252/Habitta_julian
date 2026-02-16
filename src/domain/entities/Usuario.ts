/**
 * Interfaz de Usuario — coincide con la tabla `usuarios` en Supabase.
 * El campo `contrasena` es gestionado por Supabase Auth internamente.
 */
export interface Usuario {
  idusuario: number;
  correo: string;
  telefono: string | null;
  contrasena: string;
  nombre: string;
  fotoperfil: string | null;
  descripcion: string | null;
  estadocuenta: string | null;
  ultimaactividad: string | null;
  fechalogin: string | null;
}

/**
 * Tipo para crear un usuario nuevo en la tabla `usuarios`.
 * Excluye `idusuario` (auto-generado) y campos gestionados por triggers.
 */
export type CreateUsuarioInput = Omit<
  Usuario,
  "idusuario" | "estadocuenta" | "ultimaactividad" | "fechalogin"
>;
