import type { Property } from "@domain/entities/Property";
import { propertyApi } from "@infrastructure/api/properties.api";

export const propertyService = {
  getProperties: async (): Promise<Property[]> => {
    return await propertyApi.getAll();
  },
  createProperty: async (property: Omit<Property, "id">): Promise<Property> => {
    // Here we could add business logic validation
    return await propertyApi.create(property);
  },
};
