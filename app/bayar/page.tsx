"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useOrder } from "@/hooks/useOrder";
import { payOrder } from "@/service/order-service";

export default function BayarPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId")!;
  const { order, loading }: any = useOrder(orderId);

  if (loading) return <p className="text-white">Loading...</p>;

  const handleBayar = async () => {
    try {
      await payOrder(orderId, order.paket?.inventoryId);
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-xl font-bold mb-2">Pembayaran QRIS</h1>

      <p className="mb-4">
        Total: Rp {order?.totalBayar?.toLocaleString("id-ID")}
      </p>

      <Image src="/qrisPs.jpg" alt="QR" width={260} height={260} />

      {order.status === "PENDING" && (
        <button
          onClick={handleBayar}
          className="mt-6 px-6 py-3 bg-orange-400 text-black rounded-xl"
        >
          Saya Sudah Bayar
        </button>
      )}

      {order.status === "PAID" && (
        <div className="mt-6 text-center border border-green-500 p-4 rounded-xl">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="font-bold">PEMBAYARAN BERHASIL</p>
          <p className="text-sm text-gray-400 mt-1">
            Silakan ambil unit dan nota di tempat
          </p>
        </div>
      )}
    </main>
  );
}
