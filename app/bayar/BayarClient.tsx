"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "@/hooks/useOrder";
import { confirmPaymentByUser } from "@/service/order-service";

export default function BayarClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { order, loading } = useOrder(orderId);

  const [isPaying, setIsPaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // auto close popup
  useEffect(() => {
    if (!showPopup) return;
    const t = setTimeout(() => setShowPopup(false), 2000);
    return () => clearTimeout(t);
  }, [showPopup]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Order tidak ditemukan
      </main>
    );
  }

  const handleBayar = async () => {
    try {
      setIsPaying(true);
      await confirmPaymentByUser(orderId);
      setShowPopup(true);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsPaying(false);
    }
  };

  const userHasConfirmed = !!order.userConfirmedAt;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-white px-6">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-90"
        style={{ backgroundImage: "url('/bkg2.jpeg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        <h1 className="text-2xl font-extrabold mb-4 text-[#FFD7A1]">
          Pembayaran QRIS
        </h1>

        <p className="text-gray-300">Total Pembayaran</p>
        <p className="text-3xl font-bold mb-4 text-orange-400">
          Rp {order.totalBayar?.toLocaleString("id-ID")}
        </p>

        {/* CATATAN */}
        <div className="text-sm text-gray-300 bg-black/40 border border-white/10 rounded-xl p-4 mb-5 text-left">
          <ul className="space-y-1 list-disc list-inside">
            <li>Bayar sesuai jumlah</li>
            <li>Simpan bukti pembayaran</li>
            <li>Tunjukkan bukti saat pengambilan</li>
          </ul>
        </div>

        {/* QR */}
        <Image
          src="/qrisPs.jpg"
          alt="QRIS"
          width={260}
          height={260}
          className="rounded-xl mb-6"
        />

        {/* ACTION */}
        {order.status === "PENDING" && !userHasConfirmed && (
          <button
            onClick={handleBayar}
            disabled={isPaying}
            className="px-8 py-3 bg-orange-400 text-black rounded-xl font-bold hover:bg-orange-500 transition disabled:opacity-60"
          >
            {isPaying ? "Memproses..." : "Saya Sudah Bayar"}
          </button>
        )}

        {order.status === "PENDING" && userHasConfirmed && (
          <div className="mt-6 text-yellow-400 font-bold">
            Menunggu Konfirmasi Admin ⏳
          </div>
        )}

        {order.status === "PAID" && (
          <div className="mt-6 text-center space-y-4">
            <div className="text-green-400 font-bold">
              Pembayaran Berhasil ✅
            </div>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-orange-400 text-black rounded-lg font-semibold"
            >
              Kembali ke Halaman Utama
            </button>
          </div>
        )}
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70" />
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative bg-[#141414] border border-orange-400/40 rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-3">✅</div>
              <p className="text-[#FFD7A1] font-bold">
                Pesanan sedang diproses
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
