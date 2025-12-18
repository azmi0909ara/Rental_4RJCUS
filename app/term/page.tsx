"use client";

import Navbar from "../components/navbar";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 relative min-h-screen px-6 text-white">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90"
          style={{ backgroundImage: "url('/bkg2.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto"
        >

{/* Breadcrumb */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-300">Beranda &gt; Term & Condition</p>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-extrabold text-center mb-10 text-[#FFD7A1]">
            Terms & Conditions
          </h1>

          {/* CARD */}
          <div className="bg-[#141414]/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-[#FFA64D]/30 space-y-6 text-gray-300 leading-relaxed">
            <h2 className="text-xl font-bold text-orange-400">
              Ketentuan Penyewaan
            </h2>

            <ul className="list-disc pl-6 space-y-3 text-sm md:text-base">
              <li>
                Penyewa wajib mengisi data diri secara lengkap dan jelas.
                Untuk keperluan verifikasi, penyewa diminta menyiapkan identitas
                berupa <b>KTP / SIM</b>. Data dijamin aman dan hanya digunakan
                untuk proses penyewaan.
              </li>

              <li>
                Pembayaran dilakukan <b>sebelum unit diserahkan</b>. Metode
                pembayaran dapat melalui transfer, e-wallet, atau metode lain
                yang tersedia.
              </li>

              <li>
                Durasi sewa dihitung sejak unit diterima oleh penyewa. Keterlambatan
                pengembalian akan dikenakan <b>denda sesuai ketentuan</b> yang berlaku.
              </li>

              <li>
                Unit yang disewa wajib dikembalikan dalam kondisi lengkap,
                termasuk aksesoris dan kelengkapan lainnya.
              </li>

              <li>
                Kerusakan atau kehilangan unit akibat kelalaian penyewa akan
                dikenakan <b>ganti rugi sesuai nilai barang</b>.
              </li>

              <li>
                Konsol tidak diperbolehkan untuk dibongkar, dimodifikasi,
                atau disewakan kembali kepada pihak lain.
              </li>

              <li>
                Dengan menekan tombol <b>&quot;Pesan Sekarang&quot;</b>,
                penyewa dianggap telah membaca, memahami, dan menyetujui
                seluruh syarat dan ketentuan di atas.
              </li>
            </ul>

            <div className="pt-6 text-center text-xs text-gray-400">
              Terima kasih telah mempercayakan kebutuhan gaming kamu kepada
              <span className="text-orange-400 font-semibold"> 4RJCUS</span> 🎮
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
