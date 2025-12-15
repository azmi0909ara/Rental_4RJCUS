"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Gamepad2,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "__session=; path=/; max-age=0;";
    router.push("/login");
  };

  // Sample Data
  const stats = [
    {
      label: "Revenue Hari Ini",
      value: "Rp 450.000",
      icon: DollarSign,
      color: "#10B981",
      trend: "+12%",
    },
    {
      label: "Pesanan Aktif",
      value: "8",
      icon: ShoppingCart,
      color: "#3B82F6",
      trend: "+3",
    },
    {
      label: "PS Tersedia",
      value: "12/20",
      icon: Gamepad2,
      color: "#8B5CF6",
      trend: "60%",
    },
    {
      label: "Total Customer",
      value: "156",
      icon: Users,
      color: "#F59E0B",
      trend: "+24",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Budi Santoso",
      item: "PS4 + TV",
      duration: "3 hari",
      status: "active",
      date: "12 Des 2024",
    },
    {
      id: "ORD-002",
      customer: "Siti Rahma",
      item: "PS3",
      duration: "2 hari",
      status: "pending",
      date: "12 Des 2024",
    },
    {
      id: "ORD-003",
      customer: "Ahmad Fauzi",
      item: "PS4",
      duration: "5 hari",
      status: "active",
      date: "11 Des 2024",
    },
    {
      id: "ORD-004",
      customer: "Dewi Lestari",
      item: "PS3 + TV",
      duration: "1 hari",
      status: "completed",
      date: "10 Des 2024",
    },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Pesanan", icon: ShoppingCart },
    { id: "inventory", label: "Inventory PS", icon: Package },
    { id: "customers", label: "Pelanggan", icon: Users },
    { id: "finance", label: "Keuangan", icon: DollarSign },
    { id: "analytics", label: "Analitik", icon: BarChart3 },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      active: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      completed: "bg-gray-100 text-gray-800 border-gray-300",
    };
    return styles[status] || styles.pending;
  };

  const getStatusIcon = (status: string) => {
    if (status === "active") return <CheckCircle className="w-4 h-4" />;
    if (status === "pending") return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#1a1a1a] text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#FFA64D" }}
              >
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="font-bold text-lg" style={{ color: "#FFD7A1" }}>
                  4RJCUS
                </h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto"
              style={{ backgroundColor: "#FFA64D" }}
            >
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.id
                  ? "text-black font-semibold"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              style={
                activeMenu === item.id ? { backgroundColor: "#FFA64D" } : {}
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-all"
            onClick={() => handleLogout()}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {menuItems.find((m) => m.id === activeMenu)?.label ||
                  "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500">
                Selamat datang kembali, Admin!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                Admin 4RJCUS
              </p>
              <p className="text-xs text-gray-500">admin@4rjcus.com</p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: "#FFA64D" }}
            >
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeMenu === "dashboard" && (
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
                        <p className="text-sm text-gray-600 mb-1">
                          {stat.label}
                        </p>
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
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">
                      Pesanan Terbaru
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                              {order.customer.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-900">
                                  {order.customer}
                                </p>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusBadge(
                                    order.status
                                  )}`}
                                >
                                  {getStatusIcon(order.status)}
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {order.item} • {order.duration}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {order.date}
                              </p>
                            </div>
                          </div>
                          <button
                            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                            style={{
                              color: "#FFA64D",
                              border: "1px solid #FFA64D",
                            }}
                          >
                            Detail
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions & Alerts */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button
                        className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                        style={{ backgroundColor: "#FFA64D" }}
                      >
                        + Pesanan Baru
                      </button>
                      <button
                        className="w-full py-3 rounded-lg font-semibold transition-all border-2"
                        style={{ color: "#FFA64D", borderColor: "#FFA64D" }}
                      >
                        Lihat Kalender
                      </button>
                      <button className="w-full py-3 rounded-lg font-semibold transition-all border-2 border-gray-300 text-gray-700">
                        Laporan Harian
                      </button>
                    </div>
                  </div>

                  {/* Alerts */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Peringatan
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-900">
                            3 PS harus kembali hari ini
                          </p>
                          <p className="text-xs text-yellow-700 mt-1">
                            Hubungi pelanggan untuk konfirmasi
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            2 PS butuh maintenance
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            Cek kondisi sebelum disewakan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder untuk menu lain */}
          {activeMenu !== "dashboard" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#FFA64D20" }}
              >
                {menuItems.find((m) => m.id === activeMenu)?.icon && (
                  <span style={{ color: "#FFA64D" }}>
                    {(() => {
                      const Icon = menuItems.find(
                        (m) => m.id === activeMenu
                      )?.icon;
                      return Icon ? <Icon className="w-10 h-10" /> : null;
                    })()}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {menuItems.find((m) => m.id === activeMenu)?.label}
              </h3>
              <p className="text-gray-600">
                Halaman ini sedang dalam pengembangan
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
