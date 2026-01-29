import type { PropertyType, OperationType } from "../enums/PropertyType";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  location: {
    address: string;
    city: string;
    state: string;
    neighborhood: string;
  };
  type: PropertyType;
  operation: OperationType;
  features: {
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    furnished: boolean;
  };
  images: string[];
}
