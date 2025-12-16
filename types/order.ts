export type OrderStatus =
  | "PENDING"
  | "WAITING_CONFIRMATION"
  | "PAID"
  | "COMPLETED"
  | "CANCELLED";

export interface Order {
  id: string;
  nama: string;
  tipe: string;
  totalBayar: number;
  status: OrderStatus;
  createdAt: any;
}
