// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

interface User {
  uid: string;
  email: string | null;
  role: "admin";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // Karena cuma ada admin
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: "admin",
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // opsional: fungsi logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, loading, logout };
}
