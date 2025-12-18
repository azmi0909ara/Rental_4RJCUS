"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import type { Device } from "@/types/Inventory";

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "devices"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Device));
      setDevices(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { devices, loading };
};
