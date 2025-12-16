import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export const updateOrderStatus = async (
  orderId: string,
  newStatus: "PENDING" | "WAITING_CONFIRMATION" | "PAID" | "CANCELLED",
  tipe?: "PS3" | "PS4"
) => {
  await runTransaction(db, async (tx) => {
    const orderRef = doc(db, "orders", orderId);

    if (newStatus !== "PAID") {
      tx.update(orderRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
      return;
    }

    // const inventoryRef = doc(db, "inventory", tipe!);
    // const inventorySnap = await tx.get(inventoryRef);

    // if (!inventorySnap.exists()) throw new Error("Inventory not found");

    // const available = inventorySnap.data().available;
    // if (available <= 0) throw new Error("Stock habis");

    // tx.update(inventoryRef, {
    //   available: available - 1,
    //   updatedAt: serverTimestamp(),
    // });

    tx.update(orderRef, {
      status: "PAID",
      paidAt: serverTimestamp(),
    });
  });
};
