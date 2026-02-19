import type {
  Property,
  CreatePropertyInput,
  UpdatePropertyInput,
} from "@domain/entities/Property";
import type { Caracteristica } from "@domain/entities/Caracteristica";
import { propertyApi } from "@infrastructure/api/properties.api";
import { caracteristicasApi } from "@infrastructure/api/caracteristicas.api";

/** Servicio de propiedades — lógica de negocio y validaciones */
export const propertyService = {
  /** Obtener todas las propiedades */
  getProperties: async (): Promise<Property[]> => {
    return await propertyApi.getAll();
  },

  /** Obtener propiedad por ID */
  getPropertyById: async (id: number): Promise<Property | null> => {
    return await propertyApi.getById(id);
  },

  /** Obtener propiedades de un usuario */
  getPropertiesByUsuario: async (idusuario: number): Promise<Property[]> => {
    return await propertyApi.getByUsuario(idusuario);
  },

  /**
   * Crear propiedad CON características.
   * Valida campos obligatorios → inserta propiedad → inserta relaciones.
   */
  createPropertyConCaracteristicas: async (
    property: CreatePropertyInput,
    idsCaracteristicas: number[],
  ): Promise<Property> => {
    if (!property.titulo?.trim()) throw new Error("El título es obligatorio.");
    if (!property.direccion?.trim())
      throw new Error("La dirección es obligatoria.");
    if (!property.ciudad?.trim()) throw new Error("La ciudad es obligatoria.");
    if (!property.departamento?.trim())
      throw new Error("El departamento es obligatorio.");
    if (!property.tipoOperacion)
      throw new Error("El tipo de operación es obligatorio.");

    const nueva = await propertyApi.create(property);

    if (idsCaracteristicas.length > 0) {
      await caracteristicasApi.guardarCaracteristicasPropiedad(
        nueva.idpropiedad,
        idsCaracteristicas,
      );
    }

    return nueva;
  },

  /** Crear propiedad sin características */
  createProperty: async (property: CreatePropertyInput): Promise<Property> => {
    if (!property.titulo?.trim()) throw new Error("El título es obligatorio.");
    return await propertyApi.create(property);
  },

  /** Actualizar propiedad */
  updateProperty: async (
    id: number,
    updates: UpdatePropertyInput,
  ): Promise<Property> => {
    return await propertyApi.update(id, updates);
  },

  /** Eliminar propiedad */
  deleteProperty: async (id: number): Promise<void> => {
    return await propertyApi.delete(id);
  },

  /** Obtener todas las características disponibles */
  getCaracteristicas: async (): Promise<Caracteristica[]> => {
    return await caracteristicasApi.getAll();
  },

  /** Obtener características de una propiedad */
  getCaracteristicasDePropiedad: async (
    idpropiedad: number,
  ): Promise<Caracteristica[]> => {
    return await caracteristicasApi.getByPropiedad(idpropiedad);
  },
};
