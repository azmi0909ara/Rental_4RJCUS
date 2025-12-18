"use client";

import { useState, useMemo } from "react";
import { useOrders } from "@/hooks/useOrders";

export default function HistoryPage() {
  const { orders, loading } = useOrders();
  const [search, setSearch] = useState("");

  // ambil hanya order COMPLETED
  const historyOrders = useMemo(() => {
    return orders
      .filter((order: any) => order.status === "COMPLETED")
      .filter((order: any) =>
        `${order.nama} ${order.paket.label}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [orders, search]);

  const exportCSV = () => {
    if (historyOrders.length === 0) return;

    const headers = [
      "Nama",
      "Paket",
      "Durasi (jam)",
      "Total Bayar",
      "Status",
    ];

    const rows = historyOrders.map((order: any) => [
      order.nama,
      order.paket.label,
      order.paket.durasi,
      order.totalBayar,
      order.status,
    ]);

    const csvContent =
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "history-orders.csv";
    link.click();
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-gray-800 text-3xl font-bold">
              Riwayat Pesanan
            </h1>
            <p className="text-slate-600 text-sm">
              Pesanan yang sudah selesai
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            Export CSV
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari nama / paket..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-gray-600 w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* LIST */}
        {historyOrders.map((order: any) => (
          <div
            key={order.id}
            className="border-b py-4 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-800 font-semibold">{order.nama}</p>
              <p className="text-sm text-gray-600">
                {order.paket.label} • {order.paket.durasi} jam
              </p>
            </div>

            <div className="text-right">
              <p className="text-gray-800 font-bold">
                Rp {order.totalBayar.toLocaleString("id-ID")}
              </p>
              <span className="text-green-600 text-xs font-semibold">
                COMPLETED
              </span>
            </div>
          </div>
        ))}

        {historyOrders.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            Tidak ada pesanan yang cocok
          </p>
        )}
      </div>
    </div>
  );
}
