export type FirestoreItem = {
  item: string;
  duration: string;
  price: string;
};

export type FirestoreInventory = {
  id: string;
  category: "PS3" | "PS4" | "PS5";
  available: number;
  items: FirestoreItem[];
};

export type PaketItem = {
  id: string;
  inventoryId: string;
  tipe: "PS3" | "PS4" | "PS5";
  label: string;
  durasi: number;
  harga: number;
};

export type InventoryItem = {
  id: string;
  item: string;
  duration: string;
  price: string;
};

export type EditableInventoryItem = InventoryItem & {
  categoryId: string;
};

export interface InventorySection {
  id: string;
  category: string;
  available: number;
  items: InventoryItem[];
}

export interface NewItemForm {
  name: string;
  duration: string;
  price: string;
}
