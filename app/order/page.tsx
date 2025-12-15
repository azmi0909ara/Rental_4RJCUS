"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    email: "",
    jaminan: "",
    paket: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="relative min-h-screen text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-90"
        style={{ backgroundImage: "url('/bkg1.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <motion.section
        className="relative z-10 max-w-4xl mx-auto px-6 py-16"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm text-orange-400 hover:underline"
        >
          ← Kembali
        </button>

        <h1 className="text-4xl font-extrabold text-center mb-10 text-[#FFD7A1]">
          Form Pemesanan
        </h1>

        {/* CARD */}
        <div className="bg-[#141414]/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-[#FFA64D]/30 space-y-10">

          {/* DATA DIRI */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-[#FFA64D]">Data Penyewa</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={handleChange}
                className="p-3 rounded-lg bg-black/50 border border-white/20"
              />

              <input
                type="text"
                name="telepon"
                placeholder="Nomor Telepon"
                value={form.telepon}
                onChange={handleChange}
                className="p-3 rounded-lg bg-black/50 border border-white/20"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Aktif"
              value={form.email}
              onChange={handleChange}
              className="mt-4 w-full p-3 rounded-lg bg-black/50 border border-white/20"
            />
          </section>

          {/* JAMINAN */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-[#FFA64D]">
              Jaminan (Pilih Satu)
            </h2>

            <div className="flex gap-4 text-sm">
              {["KTP", "SIM", "Kartu Pelajar"].map((item) => (
                <label
                  key={item}
                  className={`px-4 py-2 rounded-lg border cursor-pointer
                    ${
                      form.jaminan === item
                        ? "bg-orange-400 text-black border-orange-400"
                        : "bg-black/40 border-white/10"
                    }`}
                >
                  <input
                    type="radio"
                    name="jaminan"
                    value={item}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {item}
                </label>
              ))}
            </div>
          </section>

          {/* PAKET */}
<section>
  <h2 className="text-xl font-bold mb-6 text-[#FFA64D]">
    Pilih Paket (Satu Paket)
  </h2>

  <div className="grid md:grid-cols-2 gap-6 text-sm">

    {/* PS3 */}
    <div className="bg-black/40 p-5 rounded-xl border border-white/10">
      <h3 className="font-semibold text-[#FFD7A1] mb-4">
        SEWA INAP PS 3
      </h3>

      <div className="space-y-2">
        {[
          "PS3 • PS + TV • 12 jam • 50k",
          "PS3 • PS + TV • 24 jam • 80k",
          "PS3 • PS AJA • 12 jam • 25k",
          "PS3 • PS AJA • 24 jam • 50k",
        ].map((item) => (
          <label
            key={item}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer
              ${
                form.paket === item
                  ? "bg-orange-400 text-black border-orange-400"
                  : "bg-black/40 border-white/10"
              }`}
          >
            <input
              type="radio"
              name="paket"
              value={item}
              onChange={handleChange}
              className="hidden"
            />
            {item}
          </label>
        ))}
      </div>
    </div>

    {/* PS4 */}
    <div className="bg-black/40 p-5 rounded-xl border border-white/10">
      <h3 className="font-semibold text-[#FFD7A1] mb-4">
        SEWA INAP PS 4
      </h3>

      <div className="space-y-2">
        {[
          "PS4 • PS + TV • 12 jam • 180k",
          "PS4 • PS + TV • 24 jam • 120k",
          "PS4 • PS AJA • 12 jam • 50k",
          "PS4 • PS AJA • 24 jam • 80k",
        ].map((item) => (
          <label
            key={item}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer
              ${
                form.paket === item
                  ? "bg-orange-400 text-black border-orange-400"
                  : "bg-black/40 border-white/10"
              }`}
          >
            <input
              type="radio"
              name="paket"
              value={item}
              onChange={handleChange}
              className="hidden"
            />
            {item}
          </label>
        ))}
      </div>
    </div>

  </div>
</section>


          {/* SUBMIT */}
          <div className="text-center pt-6">
            <motion.button
              onClick={() => setShowModal(true)}
              className="px-10 py-3 rounded-xl font-bold text-black shadow-xl disabled:opacity-50"
              style={{ backgroundColor: "#FFA64D" }}
              whileHover={{ scale: 1.05 }}
              disabled={!form.nama || !form.telepon || !form.jaminan || !form.paket}
            >
              Setuju & Bayar
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* MODAL DETAIL ORDER */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1a1a] p-6 rounded-2xl max-w-md w-full border border-orange-400"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-xl font-bold mb-4 text-[#FFD7A1]">
                Detail Order
              </h2>

              <div className="text-sm space-y-2 text-gray-300">
                <p><b>Nama:</b> {form.nama}</p>
                <p><b>Telepon:</b> {form.telepon}</p>
                <p><b>Email:</b> {form.email || "-"}</p>
                <p><b>Jaminan:</b> {form.jaminan}</p>
                <p><b>Paket:</b> {form.paket}</p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-sm"
                >
                  Batal
                </button>

                <button
                  onClick={() => router.push("/bayar")}
                  className="px-4 py-2 rounded-lg bg-orange-400 text-black font-semibold text-sm"
                >
                  Lanjut Bayar →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
