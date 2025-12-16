"use client";

type OrderStatus = "PENDING" | "WAITING_CONFIRMATION" | "PAID" | "CANCELLED";

import { useEffect, useState } from "react";
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
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    });

    return () => unsub();
  }, []);

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

  const getStatusIcon = (status: string) => {
    if (status === "active") return <CheckCircle className="w-4 h-4" />;
    if (status === "pending") return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
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

            {/* Sidebar - 1/3 width */}
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
                  <button className="w-full py-3 rounded-lg font-semibold transition-all border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
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
      </main>
    </div>
  );
}
