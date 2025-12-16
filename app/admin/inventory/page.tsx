"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { v4 as uuid } from "uuid";
import EditItemModal from "@/app/components/admin/EditingItemModal";
import {
  EditableInventoryItem,
  InventoryItem,
  InventorySection,
  NewItemForm,
} from "@/types/Inventory";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<InventorySection[]>([]);
  const [editingItem, setEditingItem] = useState<EditableInventoryItem | null>(
    null
  );
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState<NewItemForm>({
    name: "",
    duration: "",
    price: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "inventory"),
      (snapshot) => {
        const inventoryData = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as InventorySection)
        );
        setInventory(inventoryData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching inventory:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      await addDoc(collection(db, "inventory"), {
        category: newCategory,
        available: 0,
        items: [],
      });
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Gagal menambah kategori. Silakan coba lagi.");
    }
  };

  const handleAddItem = async (categoryId: string) => {
    if (!newItem.name || !newItem.duration || !newItem.price) return;

    const section = inventory.find((i) => i.id === categoryId);
    if (!section) return;

    const newEntry = {
      id: uuid(),
      item: newItem.name,
      duration: newItem.duration,
      price: newItem.price,
    };

    try {
      await updateDoc(doc(db, "inventory", categoryId), {
        items: [...section.items, newEntry],
      });

      setNewItem({ name: "", duration: "", price: "" });
      setSelectedCategoryId("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Gagal menambah item. Silakan coba lagi.");
    }
  };

  const handleUpdateItem = async (updatedItem: EditableInventoryItem) => {
    const section = inventory.find((i) => i.id === updatedItem.categoryId);
    if (!section) return;

    const updatedItems = section.items.map((item) =>
      item.id === updatedItem.id
        ? {
            id: updatedItem.id,
            item: updatedItem.item,
            duration: updatedItem.duration,
            price: updatedItem.price,
          }
        : item
    );

    try {
      await updateDoc(doc(db, "inventory", updatedItem.categoryId), {
        items: updatedItems,
      });
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Gagal mengupdate item. Silakan coba lagi.");
    }
  };

  const handleUpdateStock = async (id: string, delta: number) => {
    const section = inventory.find((i) => i.id === id);
    if (!section) return;

    const newStock = section.available + delta;
    if (newStock < 0) return;

    try {
      const ref = doc(db, "inventory", id);
      await updateDoc(ref, { available: newStock });
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Gagal mengupdate stok. Silakan coba lagi.");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) return;

    try {
      await deleteDoc(doc(db, "inventory", id));
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Gagal menghapus kategori. Silakan coba lagi.");
    }
  };

  const handleDeleteItem = async (categoryId: string, itemId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

    const section = inventory.find((i) => i.id === categoryId);
    if (!section) return;

    const updatedItems = section.items.filter((i) => i.id !== itemId);

    try {
      await updateDoc(doc(db, "inventory", categoryId), {
        items: updatedItems,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Gagal menghapus item. Silakan coba lagi.");
    }
  };

  const handleCancelAddItem = () => {
    setNewItem({ name: "", duration: "", price: "" });
    setSelectedCategoryId("");
  };

  const getStockStatusClass = (available: number): string => {
    if (available === 0) return "text-red-600 font-semibold";
    if (available <= 2) return "text-amber-600 font-semibold";
    return "text-emerald-600 font-semibold";
  };

  const getStockStatusText = (available: number): string => {
    if (available === 0) return " (Habis)";
    if (available <= 2) return " (Menipis)";
    return "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Admin Inventory PlayStation
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Kelola kategori dan stok PlayStation rental
          </p>
        </div>

        {/* Add Category Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Tambah Kategori Baru
            </h2>
          </div>
          <div className="px-6 py-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Contoh: PS5 Pro, PS5 Slim, PS4"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <button
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-colors"
              >
                Tambah Kategori
              </button>
            </div>
          </div>
        </div>

        {/* Inventory List */}
        <div className="space-y-6">
          {inventory.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                Belum ada kategori
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Mulai dengan menambahkan kategori baru di atas
              </p>
            </div>
          ) : (
            inventory.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Category Header */}
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {section.category}
                    </h2>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDeleteCategory(section.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                      >
                        Hapus Kategori
                      </button>

                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <button
                          onClick={() => handleUpdateStock(section.id, -1)}
                          disabled={section.available === 0}
                          className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600 transition-colors"
                          title="Kurangi stok"
                          aria-label="Kurangi stok"
                        >
                          <span className="text-lg font-semibold">−</span>
                        </button>

                        <span
                          className={`text-sm font-semibold min-w-[120px] text-center ${getStockStatusClass(
                            section.available
                          )}`}
                        >
                          {section.available} unit
                          {getStockStatusText(section.available)}
                        </span>

                        <button
                          onClick={() => handleUpdateStock(section.id, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                          title="Tambah stok"
                          aria-label="Tambah stok"
                        >
                          <span className="text-lg font-semibold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="px-6 py-5">
                  {section.items.length > 0 ? (
                    <div className="mb-5 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nama Item
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Durasi
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Harga
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {section.items.map((item) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {item.item}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {item.duration}
                              </td>
                              <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                {item.price}
                              </td>
                              <td className="px-4 py-3 text-sm text-right space-x-3">
                                <button
                                  onClick={() =>
                                    setEditingItem({
                                      ...item,
                                      categoryId: section.id,
                                    })
                                  }
                                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteItem(section.id, item.id)
                                  }
                                  className="font-medium text-red-600 hover:text-red-800 transition-colors"
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="mb-5 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-600">
                        Belum ada item dalam kategori ini
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Klik tombol di bawah untuk menambah item
                      </p>
                    </div>
                  )}

                  {/* Add Item Form */}
                  {selectedCategoryId === section.id ? (
                    <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Tambah Item Baru
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          placeholder="Nama item"
                          value={newItem.name}
                          onChange={(e) =>
                            setNewItem({ ...newItem, name: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Durasi (contoh: 1 hari)"
                          value={newItem.duration}
                          onChange={(e) =>
                            setNewItem({ ...newItem, duration: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Harga (contoh: Rp 50.000)"
                          value={newItem.price}
                          onChange={(e) =>
                            setNewItem({ ...newItem, price: e.target.value })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddItem(section.id)}
                            disabled={
                              !newItem.name ||
                              !newItem.duration ||
                              !newItem.price
                            }
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-colors"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={handleCancelAddItem}
                            className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedCategoryId(section.id)}
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      + Tambah Item
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <EditItemModal
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleUpdateItem}
          />
        )}
      </div>
    </div>
  );
}
