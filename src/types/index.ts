export type TileId =
  | "ocean-wave"
  | "forest-fern"
  | "terracotta-dot"
  | "yellow-star";

export interface TileProduct {
  id: TileId;
  name: string;
  unitPrice: number;
  patternSrc: string;
}

export interface CartLine {
  id: string;
  tileId: TileId;
  quantity: number;
}

export type PaymentMethod =
  | "credit_card"
  | "paypal"
  | "apple_pay"
  | "bank_transfer";

export interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface CardForm {
  number: string;
  expiry: string;
  cvv: string;
}

export const GRID_SIZE = 6;
export const GRID_CELL_COUNT = GRID_SIZE * GRID_SIZE;
