"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { InventoryItem } from "@/types/Inventory";

// ===== TYPES =====
type Device = {
  id: string;
  name: string;
  stock: number;
};

type DeviceUsed = {
  deviceId: string;
  name: string;
  qty: number;
};

export default function AdminInventoryPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<DeviceUsed[]>([]);

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  // ===== LOAD DEVICES =====
  useEffect(() => {
    return onSnapshot(collection(db, "devices"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Device));
      setDevices(data);
    });
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, "inventory"), (snap) => {
      const data = snap.docs.map(
        (d) => ({ id: d.id, ...d.data() } as InventoryItem)
      );
      setInventory(data);
    });
  }, []);

  const editItem = (item: InventoryItem) => {
    setEditingId(item.id);
    setItemName(item.item);
    setPrice(String(item.price));
    setDuration(String(item.duration));
    setSelectedDevices(item.devices);
  };

  const updateItem = async () => {
    if (!editingId) return;

    await updateDoc(doc(db, "inventory", editingId), {
      item: itemName,
      price: Number(price),
      duration: Number(duration),
      devices: selectedDevices,
    });

    resetForm();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Hapus item ini?")) return;

    await deleteDoc(doc(db, "inventory", id));
  };

  // ===== ADD DEVICE TO ITEM =====
  const addDeviceToItem = (device: Device) => {
    if (selectedDevices.find((d) => d.deviceId === device.id)) return;

    setSelectedDevices((prev) => [
      ...prev,
      { deviceId: device.id, name: device.name, qty: 1 },
    ]);
  };

  // ===== UPDATE QTY =====
  const updateQty = (deviceId: string, qty: number) => {
    if (qty <= 0) return;

    setSelectedDevices((prev) =>
      prev.map((d) => (d.deviceId === deviceId ? { ...d, qty } : d))
    );
  };

  // ===== REMOVE DEVICE =====
  const removeDevice = (deviceId: string) => {
    setSelectedDevices((prev) => prev.filter((d) => d.deviceId !== deviceId));
  };

  // ===== SAVE ITEM =====
  const saveItem = async () => {
    if (!itemName || !price || !duration || selectedDevices.length === 0) {
      alert("Lengkapi data dan pilih minimal 1 device");
      return;
    }

    if (editingId) {
      await updateItem();
      return;
    }

    await addDoc(collection(db, "inventory"), {
      item: itemName,
      price: Number(price),
      duration: Number(duration),
      devices: selectedDevices,
      createdAt: new Date(),
    });

    resetForm();
  };

  const resetForm = () => {
    setItemName("");
    setPrice("");
    setDuration("");
    setSelectedDevices([]);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* ITEM FORM */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-8 hover:shadow-3xl transition duration-300 transform">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Informasi Paket
              </h2>
              <p className="text-slate-500 text-sm">
                Isi detail paket rental Anda
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                Nama Paket
              </label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Contoh: Paket Premium Gaming"
                className="w-full border-2 border-slate-200 rounded-2xl p-4 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition text-slate-700 font-medium bg-white/50 hover:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Harga (Rp)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold">Rp</span>
                  </div>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="50000"
                    type="number"
                    className="w-full border-2 border-slate-200 rounded-2xl p-4 pl-14 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition text-slate-700 font-medium bg-white/50 hover:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                  Durasi (Jam)
                </label>
                <div className="relative">
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="2"
                    type="number"
                    className="w-full border-2 border-slate-200 rounded-2xl p-4 pr-14 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 focus:outline-none transition text-slate-700 font-medium bg-white/50 hover:bg-white"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold text-sm">
                      JAM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEVICE PICKER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AVAILABLE DEVICES */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Pilih Device
                </h2>
              </div>
              <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                {devices.length} tersedia
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {devices.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg"></div>
                  <p className="text-slate-500 text-sm font-bold mb-1">
                    Belum ada device
                  </p>
                  <p className="text-slate-400 text-xs">
                    Tambahkan device terlebih dahulu
                  </p>
                </div>
              )}

              {devices.map((d) => (
                <button
                  key={d.id}
                  onClick={() => addDeviceToItem(d)}
                  disabled={
                    selectedDevices.find((sd) => sd.deviceId === d.id) !==
                    undefined
                  }
                  className="w-full flex justify-between items-center border-2 border-slate-200 p-4 rounded-2xl hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:bg-transparent group transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-800 text-lg">
                      {d.name}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full shadow-sm">
                    Stok: {d.stock}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SELECTED DEVICES */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Device Dipakai
                </h2>
              </div>
              <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                {selectedDevices.length} dipilih
              </span>
            </div>

            {selectedDevices.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl">
                  <svg
                    className="w-12 h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-slate-600 font-bold text-lg mb-2">
                  Belum ada device dipilih
                </p>
                <p className="text-slate-400 text-sm">
                  Pilih device dari daftar sebelah kiri untuk memulai
                </p>
              </div>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {selectedDevices.map((d) => (
                <div
                  key={d.deviceId}
                  className="flex items-center justify-between border-2 border-purple-200 p-5 rounded-2xl bg-gradient-to-r from-white to-purple-50 shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02]"
                >
                  <span className="font-bold text-slate-800 text-lg">
                    {d.name}
                  </span>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm">
                      <label className="text-xs font-black text-slate-600 uppercase">
                        Qty:
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={d.qty}
                        onChange={(e) =>
                          updateQty(d.deviceId, Number(e.target.value))
                        }
                        className="w-16 border-2 border-purple-200 rounded-lg px-3 py-2 text-center font-black text-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none transition"
                      />
                    </div>
                    <button
                      onClick={() => removeDevice(d.deviceId)}
                      className="text-red-600 hover:text-white font-bold text-sm bg-red-100 hover:bg-red-500 px-4 py-2 rounded-xl transition duration-300 shadow-sm hover:shadow-md transform"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveItem}
          className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transition duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-4 relative overflow-hidden group"
        >
          <svg
            className="w-7 h-7 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="relative z-10">
            {editingId ? "Update Item Inventory" : "Simpan Item Inventory"}
          </span>
        </button>

        {editingId && (
          <button
            onClick={resetForm}
            className="w-full mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 py-4 rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transition duration-300 transform"
          >
            Batal Edit
          </button>
        )}

        {/* SUMMARY CARD */}
        <div className="mt-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Daftar Inventory
              </h2>
              <p className="text-slate-500 text-sm">
                Total {inventory.length} paket tersedia
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {inventory.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-10 h-10 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-slate-500 font-bold mb-1">
                  Belum ada inventory
                </p>
                <p className="text-slate-400 text-sm">
                  Buat paket pertama Anda di atas
                </p>
              </div>
            )}

            {inventory.map((inv) => (
              <div
                key={inv.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-2 border-slate-200 p-6 rounded-2xl hover:border-purple-300 hover:shadow-lg transition duration-300 bg-gradient-to-r from-white to-slate-50 gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <p className="font-black text-slate-800 text-lg">
                      {inv.item}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Rp {inv.price.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {inv.duration} Jam
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {inv.devices.map((d, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full shadow-sm"
                      >
                        {d.name} ×{d.qty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => editItem(inv)}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 font-bold text-sm hover:from-amber-200 hover:to-yellow-200 shadow-md hover:shadow-lg transition duration-300 transform"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(inv.id)}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-100 to-pink-100 text-red-700 font-bold text-sm hover:from-red-200 hover:to-pink-200 shadow-md hover:shadow-lg transition duration-300 transform"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
