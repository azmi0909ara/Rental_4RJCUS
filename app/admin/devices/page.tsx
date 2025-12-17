"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import type { Device } from "@/types/Inventory";

export default function AdminDevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [newDevice, setNewDevice] = useState("");

  useEffect(() => {
    return onSnapshot(collection(db, "devices"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Device));
      setDevices(data);
    });
  }, []);

  const updateStock = async (id: string, delta: number) => {
    const device = devices.find((d) => d.id === id);
    if (!device) return;
    if (device.stock + delta < 0) return;

    await updateDoc(doc(db, "devices", id), {
      stock: device.stock + delta,
    });
  };

  const addDevice = async () => {
    if (!newDevice.trim()) return;
    await addDoc(collection(db, "devices"), {
      name: newDevice,
      stock: 0,
    });
    setNewDevice("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Admin Devices
          </h1>
          <p className="text-slate-600">Kelola stok perangkat dan device</p>
        </div>

        {/* ADD DEVICE FORM */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Tambah Device Baru
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={newDevice}
              onChange={(e) => setNewDevice(e.target.value)}
              placeholder="Nama device (PS4, TV, dll)"
              className="flex-1 border-2 border-slate-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition text-slate-700 font-medium"
            />
            <button
              onClick={addDevice}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg px-8 py-3 font-semibold shadow-md hover:shadow-lg transition duration-200 transform hover:scale-105"
            >
              Tambah Device
            </button>
          </div>
        </div>

        {/* DEVICES LIST */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Daftar Devices ({devices.length})
          </h2>

          {devices.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 text-lg font-medium">
                Belum ada device yang ditambahkan
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Mulai dengan menambahkan device baru di atas
              </p>
            </div>
          )}

          {devices.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 p-5 transition duration-200 transform hover:scale-[1.01]"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* DEVICE NAME */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800">{d.name}</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Device ID: {d.id.slice(0, 8)}...
                  </p>
                </div>

                {/* STOCK CONTROLS */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateStock(d.id, -1)}
                    disabled={d.stock === 0}
                    className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-md hover:shadow-lg transition duration-200 transform hover:scale-110 disabled:transform-none flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  <div className="min-w-[80px] text-center">
                    <div className="text-3xl font-bold text-slate-800">
                      {d.stock}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      stok
                    </div>
                  </div>

                  <button
                    onClick={() => updateStock(d.id, 1)}
                    className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition duration-200 transform hover:scale-110 flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* STOCK STATUS BAR */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-600">
                    Status Stok
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      d.stock === 0
                        ? "text-red-600"
                        : d.stock < 5
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {d.stock === 0
                      ? "Habis"
                      : d.stock < 5
                      ? "Rendah"
                      : "Tersedia"}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      d.stock === 0
                        ? "bg-red-500"
                        : d.stock < 5
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min((d.stock / 10) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
