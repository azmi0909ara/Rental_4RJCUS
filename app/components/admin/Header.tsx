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

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
  return (
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
            {menuItems.find((m) => m.id === activeMenu)?.label || "Dashboard"}
          </h2>
          <p className="text-sm text-gray-500">
            Selamat datang kembali, Admin!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">Admin 4RJCUS</p>
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
  );
};

export default Header;
