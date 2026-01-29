export const PropertyType = {
  HOUSE: "house",
  APARTMENT: "apartment",
  LOT: "lot",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export const OperationType = {
  SALE: "sale",
  RENT: "rent",
} as const;

export type OperationType = (typeof OperationType)[keyof typeof OperationType];
