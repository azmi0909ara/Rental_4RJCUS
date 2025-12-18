"use client";
import React, { useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const router = useRouter();
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
      id: "history",
      label: "Riwayat Pesanan",
      href: "/admin/history",
      icon: Clock,
    },
    {
      id: "inventory",
      label: "Inventory PS",
      href: "/admin/inventory",
      icon: Package,
    },
    {
      id: "devices",
      label: "Devices",
      href: "/admin/devices",
      icon: Gamepad2,
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "__session=; path=/; max-age=0;";
    router.push("/login");
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-[#1a1a1a] text-white transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="" />
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
            onClick={() => {
              setActiveMenu(item.id);
              router.push(item.href);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeMenu === item.id
                ? "text-black font-semibold"
                : "text-gray-300 hover:bg-gray-800"
            }`}
            style={activeMenu === item.id ? { backgroundColor: "#FFA64D" } : {}}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <Link href={item.href} className="text-sm">
                {item.label}
              </Link>
            )}
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
  );
};

export default Sidebar;
