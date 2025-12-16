import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { reduceStock, addStock } from "./inventory-service";

// Bayar order → kurangi stock
export const payOrder = async (orderId: string, inventoryId: string) => {
  await runTransaction(db, async (tx) => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await tx.get(orderRef);
    if (!orderSnap.exists()) throw new Error("Order tidak ditemukan");
    const orderData = orderSnap.data();
    if (orderData.status === "PAID") throw new Error("Order sudah dibayar");

    // Kurangi stock
    await reduceStock(inventoryId);

    tx.update(orderRef, {
      status: "PAID",
      paidAt: serverTimestamp(),
    });
  });
};

// Return order → tambah stock
export const returnOrder = async (orderId: string, tipe: "PS3" | "PS4") => {
  await runTransaction(db, async (tx) => {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await tx.get(orderRef);
    if (!orderSnap.exists()) throw new Error("Order tidak ditemukan");

    const orderData = orderSnap.data();
    if (orderData.status !== "PAID") throw new Error("Order belum dibayar");

    // Tambah stock
    await addStock(tipe);

    tx.update(orderRef, {
      status: "COMPLETED",
      returnedAt: serverTimestamp(),
    });
  });
};
