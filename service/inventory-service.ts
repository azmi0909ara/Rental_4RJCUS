import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Kurangi stock
export const reduceStock = async (inventoryId: string, jumlah = 1) => {
  const ref = doc(db, "inventory", inventoryId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) throw new Error("Inventory tidak ditemukan");
    const data = snap.data();
    if (data.available < jumlah) throw new Error("Stock habis!");
    tx.update(ref, {
      available: data.available - jumlah,
      updatedAt: serverTimestamp(),
    });
  });
};

// Tambah stock
export const addStock = async (inventoryId: string, jumlah = 1) => {
  const ref = doc(db, "inventory", inventoryId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) throw new Error("Inventory tidak ditemukan");
    const data = snap.data();
    tx.update(ref, {
      available: data.available + jumlah,
      updatedAt: serverTimestamp(),
    });
  });
};
