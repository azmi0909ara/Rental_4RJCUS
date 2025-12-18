"use client";

import { useOrders } from "@/hooks/useOrders";
import { payOrder, returnOrder } from "@/service/order-service";

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  // 👉 hanya tampilkan order yang BELUM completed
  const activeOrders = orders.filter(
    (order: any) => order.status !== "COMPLETED"
  );

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      if (status === "PAID") {
        await payOrder(orderId);
        alert("Order berhasil dibayar, stock dikurangi!");
      }

      if (status === "COMPLETED") {
        await returnOrder(orderId);
        alert("Pesanan selesai & masuk ke history");
        // tidak perlu setState manual
        // useOrders() akan auto re-fetch
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-3"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          {/* Header */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Daftar Pesanan
            </h1>
            <p className="text-slate-600">Pesanan yang sedang berjalan</p>
          </div>

          {/* Orders List */}
          <div className="space-y-1">
            {activeOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-slate-100 py-5 px-4 hover:bg-slate-50 rounded-lg transition"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-lg mb-1">
                    {order.nama}
                  </p>
                  <p className="text-sm text-slate-600">
                    {order.paket.label} • {order.paket.durasi} jam •{" "}
                    {order.jaminan}
                  </p>
                </div>

                <div className="flex gap-6 items-center">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border-2 border-slate-200 px-4 py-2 rounded-lg text-black"
                  >
                    <option value="PENDING">🕒 PENDING</option>
                    <option value="PAID">✅ PAID</option>
                    <option value="COMPLETED">✔ COMPLETED</option>
                  </select>

                  <span className="font-bold text-slate-800 text-lg">
                    Rp {order.totalBayar.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {activeOrders.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-slate-700">
                Tidak ada pesanan aktif
              </h3>
              <p className="text-slate-500">Semua pesanan sudah selesai 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
