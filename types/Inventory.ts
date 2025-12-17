export type InventoryItem = {
  id: string;
  item: string;
  duration: string;
  price: string;
  devices: PackageDevice[];
};

export type EditableInventoryItem = InventoryItem & {
  categoryId: string;
};

export interface InventorySection {
  id: string;
  category: string;
  items: InventoryItem[];
}

export interface NewItemForm {
  name: string;
  duration: string;
  price: string;
}

export type Device = {
  id: string;
  name: string;
  stock: number;
};

export type PackageDevice = {
  deviceId: string;
  name: string;
  qty: number;
};

export type InventoryPackage = {
  id: string;
  name: string;
  duration: string;
  price: string;
  devices: PackageDevice[];
};

export type PaketItem = {
  id: string;
  inventoryId: string;
  label: string;
  durasi: number;
  harga: number;
  devices: PackageDevice[];
};
