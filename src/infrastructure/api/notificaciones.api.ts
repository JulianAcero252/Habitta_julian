import { supabase } from "@infrastructure/supabase/client";

export interface NotificacionPreferencia {
  id: number;
  idusuario: number;
  recibir_emails: boolean;
  alertas_mensajes: boolean;
  alertas_estado_propiedad: boolean;
}

export const notificacionesApi = {
  /**
   * Obtiene las preferencias de un usuario. Si no existen, las crea por defecto.
   */
  getPreferencias: async (idusuario: number): Promise<NotificacionPreferencia> => {
    const { data, error } = await supabase
      .from("notificaciones_preferencias")
      .select("*")
      .eq("idusuario", idusuario)
      .maybeSingle();

    if (error) throw new Error(`Error obteniendo preferencias: ${error.message}`);
    
    // Si no existen (porque el usuario es nuevo y no se insertó un trigger BD), las creamos
    if (!data) {
      return await notificacionesApi.crearPreferenciasPorDefecto(idusuario);
    }
    
    return data;
  },

  /**
   * Crea preferencias por defecto (todas true).
   */
  crearPreferenciasPorDefecto: async (idusuario: number): Promise<NotificacionPreferencia> => {
    const defaultPrefs = {
      idusuario,
      recibir_emails: true,
      alertas_mensajes: true,
      alertas_estado_propiedad: true,
    };
    const { data, error } = await supabase
      .from("notificaciones_preferencias")
      .insert(defaultPrefs)
      .select()
      .single();

    if (error) throw new Error(`Error creando preferencias: ${error.message}`);
    return data;
  },

  /**
   * Actualiza las preferencias de notificaciones.
   */
  updatePreferencias: async (idusuario: number, updates: Partial<Omit<NotificacionPreferencia, 'id' | 'idusuario'>>): Promise<NotificacionPreferencia> => {
    const { data, error } = await supabase
      .from("notificaciones_preferencias")
      .update(updates)
      .eq("idusuario", idusuario)
      .select()
      .single();

    if (error) throw new Error(`Error actualizando preferencias: ${error.message}`);
    return data;
  }
};
