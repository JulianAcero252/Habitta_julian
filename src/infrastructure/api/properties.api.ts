import { supabase } from "@infrastructure/supabase/client";
import type {
  Property,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@domain/entities/Property";

/**
 * API de propiedades — operaciones CRUD contra la tabla `propiedades` en Supabase.
 * Los campos `estado_publicacion` y `fechacreacion` son gestionados automáticamente
 * por triggers en la base de datos.
 */
export const propertyApi = {
  /**
   * Obtiene todas las propiedades.
   * Ordena por fecha de creación descendente (más recientes primero).
   */
  getAll: async (): Promise<Property[]> => {
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .order("fechacreacion", { ascending: false });

    if (error) {
      console.error("Error al obtener propiedades:", error.message);
      throw new Error(error.message);
    }

    return data ?? [];
  },

  /**
   * Obtiene una propiedad por su ID.
   */
  getById: async (id: number): Promise<Property | null> => {
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .eq("idpropiedad", id)
      .single();

    if (error) {
      console.error(`Error al obtener propiedad ${id}:`, error.message);
      return null;
    }

    return data;
  },

  /**
   * Obtiene propiedades de un usuario específico.
   */
  getByUsuario: async (idusuario: number): Promise<Property[]> => {
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .eq("idusuario", idusuario)
      .order("fechacreacion", { ascending: false });

    if (error) {
      console.error(
        `Error al obtener propiedades del usuario ${idusuario}:`,
        error.message,
      );
      throw new Error(error.message);
    }

    return data ?? [];
  },

  /**
   * Crea una nueva propiedad.
   * No envía `estado_publicacion` ni `fechacreacion` — los triggers lo manejan.
   */
  create: async (property: CreatePropertyInput): Promise<Property> => {
    const { data, error } = await supabase
      .from("propiedades")
      .insert(property)
      .select()
      .single();

    if (error) {
      console.error("Error al crear propiedad:", error.message);
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Actualiza una propiedad existente.
   * Solo envía los campos que se quieren cambiar.
   */
  update: async (
    id: number,
    updates: UpdatePropertyInput,
  ): Promise<Property> => {
    const { data, error } = await supabase
      .from("propiedades")
      .update(updates)
      .eq("idpropiedad", id)
      .select()
      .single();

    if (error) {
      console.error(`Error al actualizar propiedad ${id}:`, error.message);
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Elimina una propiedad por su ID.
   */
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("propiedades")
      .delete()
      .eq("idpropiedad", id);

    if (error) {
      console.error(`Error al eliminar propiedad ${id}:`, error.message);
      throw new Error(error.message);
    }
  },
};
