import { useState, useEffect, useCallback } from "react";
import type { Property } from "@domain/entities/Property";
import { propertyService } from "@application/services/propertyService";
import type { PropertyFilters } from "@infrastructure/api/properties.api";

/** Hook para consumir propiedades desde Supabase */
export function useProperties(initialFilters?: PropertyFilters) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PropertyFilters | undefined>(initialFilters);

  const fetchProperties = useCallback(async (currentFilters?: PropertyFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = currentFilters 
        ? await propertyService.getFilteredProperties(currentFilters)
        : await propertyService.getProperties();
      setProperties(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(filters);
  }, [filters, fetchProperties]);

  // Permite actualizar los filtros de forma manual desde el componente UI
  const updateFilters = useCallback((newFilters: PropertyFilters) => {
    setFilters(newFilters);
  }, []);

  return { properties, loading, error, refetch: () => fetchProperties(filters), filters, updateFilters };
}
