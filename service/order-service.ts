import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

type DeviceUsed = {
  deviceId: string;
  qty: number;
};

export const payOrder = async (orderId: string) => {
  await runTransaction(db, async (tx) => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await tx.get(orderRef);

    if (!orderSnap.exists()) throw new Error("Order tidak ditemukan");

    const order = orderSnap.data();
    if (order.status === "PAID") throw new Error("Order sudah dibayar");

    const devices = order.devicesUsed ?? [];

    // 1️⃣ READ SEMUA DEVICE
    const deviceRefs = devices.map((d: any) => doc(db, "devices", d.deviceId));

    const deviceSnaps = await Promise.all(
      deviceRefs.map((ref: any) => tx.get(ref))
    );

    // 2️⃣ VALIDASI
    deviceSnaps.forEach((snap, i) => {
      if (!snap.exists()) throw new Error("Device tidak ditemukan");

      const stock = snap.data().stock;
      if (stock < devices[i].qty) {
        throw new Error("Stok tidak mencukupi");
      }
    });

    // 3️⃣ WRITE
    deviceSnaps.forEach((snap, i) => {
      tx.update(deviceRefs[i], {
        stock: snap.data().stock - devices[i].qty,
      });
    });

    // 4️⃣ UPDATE ORDER
    tx.update(orderRef, {
      status: "PAID",
      paidAt: serverTimestamp(),
    });
  });
};

export const returnOrder = async (orderId: string) => {
  await runTransaction(db, async (tx) => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await tx.get(orderRef);

    if (!orderSnap.exists()) throw new Error("Order tidak ditemukan");

    const order = orderSnap.data();
    if (order.status !== "PAID") throw new Error("Order belum dibayar");

    const devices: DeviceUsed[] = order.devicesUsed ?? [];

    // 1️⃣ KUMPULKAN REF
    const deviceRefs = devices.map((d) => doc(db, "devices", d.deviceId));

    // 2️⃣ READ SEMUA
    const deviceSnaps = await Promise.all(deviceRefs.map((ref) => tx.get(ref)));

    // 3️⃣ WRITE (TAMBAH STOK)
    deviceSnaps.forEach((snap, i) => {
      if (!snap.exists()) return;

      const currentStock = snap.data().stock;
      tx.update(deviceRefs[i], {
        stock: currentStock + devices[i].qty,
      });
    });

    // 4️⃣ UPDATE ORDER
    tx.update(orderRef, {
      status: "COMPLETED",
      returnedAt: serverTimestamp(),
    });
  });
};
