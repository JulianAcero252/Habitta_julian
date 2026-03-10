import { useState, useEffect, useCallback } from "react";
import { busquedasApi } from "@infrastructure/api/busquedas.api";
import type { BúsquedaGuardada } from "@infrastructure/api/busquedas.api";

export function useBusquedas(id_usuario?: string) {
  const [busquedas, setBusquedas] = useState<BúsquedaGuardada[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBusquedas = useCallback(async () => {
    if (!id_usuario) {
      setBusquedas([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await busquedasApi.getPorUsuario(id_usuario);
      setBusquedas(data);
    } catch (err) {
      console.error("Error al obtener búsquedas:", err);
    } finally {
      setLoading(false);
    }
  }, [id_usuario]);

  useEffect(() => {
    fetchBusquedas();
  }, [fetchBusquedas]);

  return { busquedas, loading, refetch: fetchBusquedas };
}
