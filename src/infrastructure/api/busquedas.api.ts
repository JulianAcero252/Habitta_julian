import { supabase } from "@infrastructure/supabase/client";

export interface BúsquedaGuardada {
  id: string;
  id_usuario: string;
  titulo: string;
  filtros: Record<string, any>;
  fecha_creacion: string;
}

export const busquedasApi = {
  /** Guardar una búsqueda */
  guardarBusqueda: async (id_usuario: string, titulo: string, filtros: Record<string, any>): Promise<BúsquedaGuardada> => {
    const { data, error } = await supabase
      .from("busquedas_guardadas")
      .insert({ id_usuario, titulo, filtros })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** Obtener las búsquedas guardadas de un usuario */
  getPorUsuario: async (id_usuario: string): Promise<BúsquedaGuardada[]> => {
    const { data, error } = await supabase
      .from("busquedas_guardadas")
      .select("*")
      .eq("id_usuario", id_usuario)
      .order("fecha_creacion", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  /** Eliminar una búsqueda guardada */
  eliminarBusqueda: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("busquedas_guardadas")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
  }
};
