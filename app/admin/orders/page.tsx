"use client";

import { useOrders } from "@/hooks/useOrders";
import { payOrder, returnOrder } from "@/service/order-service";

export default function OrdersPage() {
  const { orders, loading } = useOrders();
  console.log("order: ", orders);

  const ordersWithDevices = orders.map((order) => ({
    deviceNames: (order.devicesUsed ?? [])
      .map((device: any) => device.name ?? device.deviceId)
      .filter(Boolean),
  }));

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      if (status === "PAID") {
        await payOrder(orderId);
        alert("Order berhasil dibayar, stock dikurangi!");
      } else if (status === "COMPLETED") {
        await returnOrder(orderId);
        alert("Unit dikembalikan, stock bertambah!");
      } else {
        console.log("Status lain:", status);
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
          {/* Header Section */}
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Daftar Pesanan
            </h1>
            <p className="text-slate-600">Kelola semua pesanan Anda di sini</p>
          </div>

          {/* Orders List */}
          <div className="space-y-1">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-slate-100 py-5 px-4 hover:bg-slate-50 rounded-lg transition-colors duration-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-lg mb-1">
                    {order.nama}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    {/* <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {ordersWithDevices.map((order) => (
                        <div>
                          <p className="text-sm text-gray-600">
                            {order.deviceNames.length > 0
                              ? order.deviceNames.join(", ")
                              : "-"}
                          </p>
                        </div>
                      ))}
                    </span> */}
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">
                      {order.paket.label} • {order.paket.durasi} jam
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">{order.jaminan}</span>
                  </div>
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
                    <option value="WAITING_CONFIRMATION">⏳ WAITING</option>
                    <option value="PAID">✅ PAID</option>
                    <option value="COMPLETED">✔ COMPLETED</option>
                    <option value="CANCELLED">❌ CANCELLED</option>
                  </select>

                  <span className="font-bold text-slate-800 text-lg min-w-[140px] text-right">
                    Rp {order.totalBayar.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                Belum ada pesanan
              </h3>
              <p className="text-slate-500">
                Pesanan akan muncul di sini setelah dibuat
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
