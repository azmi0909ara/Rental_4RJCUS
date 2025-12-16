"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "inventory"), (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl">
      <h1 className="text-xl font-bold mb-4">Inventory PS</h1>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between py-3 border-b">
          <p>{item.id}</p>
          <p className={item.available <= 2 ? "text-red-500 font-bold" : ""}>
            {item.available} unit
          </p>
        </div>
      ))}
    </div>
  );
}
