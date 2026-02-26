import { supabase } from "@infrastructure/supabase/client";
import type { Usuario } from "@domain/entities/Usuario";

/** Datos editables del perfil */
export interface UpdatePerfilInput {
  nombre?: string;
  telefono?: string | null;
  descripcion?: string | null;
  fotoperfil?: string | null;
}

/** Estadísticas del dashboard del usuario */
export interface UserStats {
  totalPropiedades: number;
  totalFavoritos: number;
}

/** API de usuarios — operaciones sobre la tabla `usuarios` */
export const usuariosApi = {
  /** RF09 — Actualizar perfil del usuario */
  updatePerfil: async (
    idusuario: number,
    datos: UpdatePerfilInput,
  ): Promise<Usuario> => {
    const { data, error } = await supabase
      .from("usuarios")
      .update(datos)
      .eq("idusuario", idusuario)
      .select()
      .single();

    if (error) throw new Error(`Error actualizando perfil: ${error.message}`);
    return data;
  },

  /** RF57 — Obtener estadísticas del usuario para el dashboard */
  getStats: async (idusuario: number): Promise<UserStats> => {
    // Contar propiedades del usuario
    const { count: totalPropiedades, error: errProps } = await supabase
      .from("propiedades")
      .select("idpropiedad", { count: "exact", head: true })
      .eq("idusuario", idusuario);

    if (errProps) throw new Error(errProps.message);

    // Contar favoritos del usuario
    const { count: totalFavoritos, error: errFavs } = await supabase
      .from("favoritos")
      .select("idfavorito", { count: "exact", head: true })
      .eq("idusuario", idusuario);

    if (errFavs) throw new Error(errFavs.message);

    return {
      totalPropiedades: totalPropiedades ?? 0,
      totalFavoritos: totalFavoritos ?? 0,
    };
  },
};
