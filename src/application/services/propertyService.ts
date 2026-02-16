import type {
  Property,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@domain/entities/Property";
import { propertyApi } from "@infrastructure/api/properties.api";

/**
 * Servicio de propiedades — capa de lógica de negocio.
 * Centraliza validaciones y reglas antes de llamar a la API.
 */
export const propertyService = {
  /**
   * Obtiene todas las propiedades disponibles.
   */
  getProperties: async (): Promise<Property[]> => {
    return await propertyApi.getAll();
  },

  /**
   * Obtiene una propiedad específica por su ID.
   */
  getPropertyById: async (id: number): Promise<Property | null> => {
    return await propertyApi.getById(id);
  },

  /**
   * Obtiene todas las propiedades de un usuario.
   */
  getPropertiesByUsuario: async (idusuario: number): Promise<Property[]> => {
    return await propertyApi.getByUsuario(idusuario);
  },

  /**
   * Crea una nueva propiedad.
   * Valida que tenga al menos un título antes de enviar a Supabase.
   */
  createProperty: async (property: CreatePropertyInput): Promise<Property> => {
    // Validación básica de negocio
    if (!property.titulo || property.titulo.trim() === "") {
      throw new Error("El título de la propiedad es obligatorio.");
    }

    return await propertyApi.create(property);
  },

  /**
   * Actualiza una propiedad existente.
   */
  updateProperty: async (
    id: number,
    updates: UpdatePropertyInput,
  ): Promise<Property> => {
    return await propertyApi.update(id, updates);
  },

  /**
   * Elimina una propiedad por su ID.
   */
  deleteProperty: async (id: number): Promise<void> => {
    return await propertyApi.delete(id);
  },
};
