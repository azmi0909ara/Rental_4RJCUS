// helpers/dashboardAlerts.ts
import type { Timestamp } from "firebase/firestore";

type Order = {
  status: string;
  returnedAt?: Timestamp;
  devicesUsed?: { deviceId: string; name: string; qty: number }[];
};

type Device = {
  id: string;
  name: string;
  stock: number;
};

export function getDashboardAlerts(orders: Order[], devices: Device[]) {
  const now = new Date();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // 🔸 1. Order harus kembali hari ini
  const dueToday = orders.filter((o) => {
    if (!o.returnedAt || o.status !== "PAID") return false;
    const r = o.returnedAt.toDate();
    return r >= todayStart && r <= todayEnd;
  });

  // 🔸 2. Order terlambat dikembalikan
  const overdue = orders.filter((o) => {
    if (!o.returnedAt || o.status !== "PAID") return false;
    return o.returnedAt.toDate() < todayStart;
  });

  // 🔸 3. Device stok kritis (≤ 1)
  const lowStock = devices.filter((d) => d.stock <= 1);

  return {
    dueTodayCount: dueToday.length,
    overdueCount: overdue.length,
    lowStockDevices: lowStock,
  };
}
