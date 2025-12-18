"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Gamepad2,
  TrendingUp,
  AlertCircle,
  TvMinimal,
} from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { getInitials, stringToColor } from "@/utils/avatar";
import { getExpectedReturnTime, getReturnStatus } from "@/utils/ordetTime";
import { useDevices } from "@/hooks/useDevices";
import { getDashboardAlerts } from "@/utils/dashboardAlerts";

export default function AdminDashboard() {
  const { orders } = useOrders();
  console.log("order: ", orders);

  const { devices, loading } = useDevices();
  const alerts = getDashboardAlerts(orders, devices);

  const totalRevenue = orders
    .filter((o) => o.status === "COMPLETED")
    .reduce((s, o) => s + (o.totalBayar || 0), 0);

  const activeOrders = orders.filter((o) => o.status === "PAID").length;

  const psDevices = devices.filter((d) => d.name.toLowerCase().includes("ps"));
  const tvDevices = devices.filter((d) => d.name.toLowerCase().includes("tv"));

  const totalPSStock = psDevices.reduce((sum, d) => sum + d.stock, 0);
  const totalTVStock = tvDevices.reduce((sum, d) => sum + d.stock, 0);

  // Sample Data
  const stats = [
    {
      label: "Revenue Hari Ini",
      value: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
      icon: DollarSign,
      color: "#10B981",
      trend: `${orders.length} order`,
    },
    {
      label: "Pesanan Aktif",
      value: activeOrders.toString(),
      icon: ShoppingCart,
      color: "#3B82F6",
      trend: "Realtime",
    },
    {
      label: "PS Tersedia",
      value: `${totalPSStock}`,
      icon: Gamepad2,
      color: "#8B5CF6",
      trend: `Realtime`,
    },
    {
      label: "TV Tersedia",
      value: `${totalTVStock}`,
      icon: TvMinimal,
      color: "#8B5CF6",
      trend: `Realtime`,
    },
  ];

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "orders",
      label: "Pesanan",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      id: "inventory",
      label: "Inventory PS",
      href: "/admin/inventory",
      icon: Package,
    },
    {
      id: "finance",
      label: "Keuangan",
      href: "/admin/finance",
      icon: DollarSign,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "WAITING_CONFIRMATION":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "PAID":
        return "bg-green-100 text-green-800 border-green-300";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon
                      className="w-6 h-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Orders - 2/3 width */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">
                  Pesanan Terbaru
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => {
                    const initials = getInitials(order.nama);
                    const bgColor = stringToColor(order.nama);
                    const expectedReturn = getExpectedReturnTime(
                      order.paidAt,
                      order.paket?.durasi
                    );

                    const returnStatus = getReturnStatus(
                      order.status,
                      expectedReturn,
                      order.returnedAt
                    );

                    return (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        {/* LEFT */}
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div
                            className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm"
                            style={{ backgroundColor: bgColor }}
                          >
                            {initials}
                          </div>

                          {/* Info */}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {order.nama}
                            </p>

                            <p className="text-sm text-gray-600">
                              {Array.isArray(order.devicesUsed)
                                ? order.devicesUsed
                                    .map((d: any) => `${d.name} (${d.qty})`)
                                    .join(", ")
                                : "-"}
                              {" • "}
                              {order.paket?.durasi} jam
                            </p>

                            {returnStatus && (
                              <p
                                className={`text-xs mt-1 font-medium ${returnStatus.color}`}
                              >
                                {returnStatus.label}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* RIGHT */}
                        <span
                          className={`px-2 py-1 rounded-full text-xs border font-medium ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="space-y-6">
              {/* Alerts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Peringatan
                </h3>

                <div className="space-y-3">
                  {alerts.dueTodayCount > 0 && (
                    <div className="flex gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">
                          ⚠️ {alerts.dueTodayCount} order harus kembali hari ini
                        </p>
                        <p className="text-xs text-yellow-700">
                          Hubungi pelanggan untuk konfirmasi
                        </p>
                      </div>
                    </div>
                  )}

                  {alerts.overdueCount > 0 && (
                    <div className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900">
                          🚨 {alerts.overdueCount} order terlambat dikembalikan
                        </p>
                        <p className="text-xs text-red-700">
                          Segera follow up pelanggan
                        </p>
                      </div>
                    </div>
                  )}

                  {alerts.lowStockDevices.map((d) => (
                    <div
                      key={d.id}
                      className="flex gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">
                          ⚠️ {d.name} stok tinggal {d.stock} unit
                        </p>
                        <p className="text-xs text-yellow-700">
                          Tambah stok atau batasi pesanan
                        </p>
                      </div>
                    </div>
                  ))}

                  {alerts.dueTodayCount === 0 &&
                    alerts.overdueCount === 0 &&
                    alerts.lowStockDevices.length === 0 && (
                      <p className="text-sm text-gray-500 text-center">
                        Tidak ada peringatan hari ini ✅
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
