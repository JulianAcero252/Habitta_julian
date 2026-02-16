import { useState, useEffect, useCallback } from "react";
import type { Property } from "@domain/entities/Property";
import { propertyService } from "@application/services/propertyService";

/**
 * Hook para consumir propiedades desde Supabase.
 * Maneja estados de carga, error y datos.
 *
 * Uso:
 * const { properties, loading, error, refetch } = useProperties();
 */
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar propiedades
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error desconocido";
      setError(mensaje);
      console.error("useProperties — error:", mensaje);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar propiedades al montar el componente
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  };
}
