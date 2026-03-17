import { useState, useEffect, useCallback } from "react";
import { supabase } from "@infrastructure/supabase/client";
import { notificacionesApi, type Notificacion } from "@infrastructure/api/notificaciones.api";

/**
 * Hook centralizado de notificaciones.
 * - Carga inicial desde la BD
 * - Suscripción Realtime: recibe nuevas en < 2 segundos sin recargar
 * - Expone helpers para marcar leídas y eliminar
 */
export function useNotificaciones(idusuario: number | undefined) {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(true);

  /** Cuántas notificaciones hay sin leer */
  const noLeidasCount = notificaciones.filter((n) => !n.leido).length;

  /** Carga inicial de notificaciones */
  const cargar = useCallback(async () => {
    if (!idusuario) return;
    setLoading(true);
    try {
      const data = await notificacionesApi.getByUsuario(idusuario);
      setNotificaciones(data);
    } catch (e) {
      console.error("[useNotificaciones] Error cargando:", e);
    } finally {
      setLoading(false);
    }
  }, [idusuario]);

  /** Carga inicial */
  useEffect(() => {
    cargar();
  }, [cargar]);

  /** Supabase Realtime — escucha INSERT en la tabla notificaciones */
  useEffect(() => {
    if (!idusuario) return;

    const channel = supabase
      .channel(`notificaciones_user_${idusuario}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notificaciones",
          filter: `idusuario=eq.${idusuario}`,
        },
        (payload) => {
          // Añadir la nueva notificación al tope de la lista sin recargar
          const nueva = payload.new as Notificacion;
          setNotificaciones((prev) => [nueva, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [idusuario]);

  /** Marcar una como leída/no leída */
  const toggleLeida = async (idnotificacion: number, leido: boolean) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.idnotificacion === idnotificacion ? { ...n, leido } : n))
    );
    try {
      await notificacionesApi.toggleLeida(idnotificacion, leido);
    } catch {
      // Revertir si falla
      setNotificaciones((prev) =>
        prev.map((n) => (n.idnotificacion === idnotificacion ? { ...n, leido: !leido } : n))
      );
    }
  };

  /** Marcar todas como leídas */
  const marcarTodasLeidas = async () => {
    if (!idusuario) return;
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leido: true })));
    try {
      await notificacionesApi.marcarTodasLeidas(idusuario);
    } catch (e) {
      console.error("[useNotificaciones] Error marcando todas:", e);
      cargar();
    }
  };

  /** Eliminar */
  const eliminar = async (idnotificacion: number) => {
    setNotificaciones((prev) => prev.filter((n) => n.idnotificacion !== idnotificacion));
    try {
      await notificacionesApi.eliminar(idnotificacion);
    } catch {
      cargar();
    }
  };

  return {
    notificaciones,
    loading,
    noLeidasCount,
    cargar,
    toggleLeida,
    marcarTodasLeidas,
    eliminar,
  };
}
