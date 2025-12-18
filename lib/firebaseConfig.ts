// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiNlz-jl0J3k7hWBVAbptwizmXU8y9jbg",
  authDomain: "rental-ps-4rjcus.firebaseapp.com",
  projectId: "rental-ps-4rjcus",
  storageBucket: "rental-ps-4rjcus.firebasestorage.app",
  messagingSenderId: "975879872470",
  appId: "1:975879872470:web:3d6ac111109cdefe164e77",
  measurementId: "G-DWGQCPVPNF",
};

// ✅ CEGAH INIT SAAT BUILD
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
