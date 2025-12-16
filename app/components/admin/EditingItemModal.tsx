"use client";

import { useEffect, useState } from "react";
import { EditableInventoryItem } from "@/types/Inventory";

interface EditItemModalProps {
  item: EditableInventoryItem;
  onClose: () => void;
  onSave: (updatedItem: EditableInventoryItem) => Promise<void>;
}

export default function EditItemModal({
  item,
  onClose,
  onSave,
}: EditItemModalProps) {
  const [name, setName] = useState(item.item);
  const [duration, setDuration] = useState(item.duration);
  const [price, setPrice] = useState(item.price);
  const [saving, setSaving] = useState(false);

  // ESC to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSave = async () => {
    if (!name || !duration || !price) return;

    setSaving(true);
    try {
      await onSave({
        ...item,
        item: name,
        duration,
        price,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Item Inventory
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Perbarui informasi item
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Nama Item
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  className="w-5 h-5"
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
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama item"
                className="w-full border-2 border-slate-200 pl-11 pr-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Duration Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Durasi
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  className="w-5 h-5"
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
              </div>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Contoh: 30 hari, 1 bulan"
                className="w-full border-2 border-slate-200 pl-11 pr-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Harga
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                Rp
              </div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full border-2 border-slate-200 pl-11 pr-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !name || !duration || !price}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
