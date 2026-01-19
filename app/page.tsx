"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./components/navbar";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <main className="relative min-h-screen text-white">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[85vh] w-full flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90"
          style={{ backgroundImage: "url('/bkg2.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <motion.div
          className="relative max-w-3xl text-center px-6 space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="text-5xl md:text-4xl font-extrabold drop-shadow-lg"
            style={{ color: "#FFD7A1" }}
          >
            Mau Rental PS ? Di 4RJCUS Aja!
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
            Hidupkan Lagi Kenangan Seru Bareng Temen Dan Keluarga. Sewa
            Playstation 3 & 4 Mudah Tanpa Ribet!
          </p>
          

          <div className="flex justify-center gap-4 mt-6">
            {/* Pesan Sekarang */}
            <Link href="/order">
              <motion.button
                className="px-6 py-3 rounded-lg font-semibold text-black shadow-xl"
                style={{ backgroundColor: "#FFA64D" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pesan Sekarang
              </motion.button>
            </Link>

            {/* Lihat Paket */}
            <Link href="/daftar-harga">
              <motion.button
                className="px-6 py-3 rounded-lg font-semibold border border-white/70"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Paket
              </motion.button>
            </Link>
          </div>
          <p className="text-sm md:text-base text-orange-300 font-semibold max-w mx-auto flex items-center justify-center gap-2">
        📞 +62 851-5680-3390 contact here
        </p>
          <p className="text-sm md:text-base text-orange-300 font-semibold max-w mx-auto flex items-center justify-center gap-2">
        📍 Blok D3 No.17, Jl. Semeru III, Jatimulya, 
        Kec. Tambun Selatan, Kab. Bekasi
        </p>
        </motion.div>

        {/* Gradient Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
      </section>

      {/* ================= PAKET SECTION ================= */}
      <motion.section
        className="px-6 py-20 rounded-t-3xl -mt-12"
        style={{ backgroundColor: "rgba(240, 211, 172, 0.88)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          style={{ color: "#000" }}
          variants={fadeUp}
        >
          Pilihan Paket Playstation
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Sedia", features: ["Playstation 3", "Playstation 4"] },
            {
              title: "Playstation 3",
              features: ["Sewa Inap + TV", "Sewa Inap PS Saja"],
            },
            {
              title: "Playstation 4",
              features: ["Sewa Inap + TV", "Sewa Inap PS Saja"],
            },
          ].map((ps, index) => (
            <Link key={index} href="/daftar-harga">
              <motion.div
                className="bg-[#1a1a1a]/80 p-8 rounded-2xl shadow-xl border border-[#FFA64D]/30 
                           hover:scale-105 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm cursor-pointer"
                variants={fadeUp}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold" style={{ color: "#FFD7A1" }}>
                  {ps.title}
                </h3>

                <ul className="mt-5 text-gray-300 text-sm space-y-2">
                  {ps.features.map((item, i) => (
                    <li key={i}>✔ {item}</li>
                  ))}
                </ul>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

{/* ================= TENTANG KAMI ================= */}
<motion.section
  className="px-6 py-24 rounded-t-3xl -mt-12"
  style={{ backgroundColor: "rgba(26, 26, 26, 0.92)" }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  <motion.div
    className="max-w-5xl mx-auto text-center space-y-6"
    variants={fadeUp}
  >
    <h2
      className="text-4xl font-extrabold"
      style={{ color: "#FFD7A1" }}
    >
      Tentang Kami
    </h2>

    <p className="text-lg italic text-orange-300">
      Karena Setiap Game Punya Cerita Sendiri
    </p>

    <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
      Kami adalah teman setia para gamers. <span className="text-[#FFA64D] font-semibold">4RJCUS</span> hadir dengan layanan
      rental PS3 dan PS4 berkualitas tinggi untuk menemani setiap
      momen bermainmu. Dari rental harian, mingguan, hingga paket
      lengkap dengan game favoritmu, semua bisa kamu nikmati dengan
      mudah.
    </p>

    <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
      Dengan pengalaman dan dedikasi terhadap kenyamanan pelanggan,
      kami berkomitmen untuk menjadikan aktivitas gaming lebih seru,
      praktis, dan tak terlupakan.
    </p>

    <p className="text-sm md:text-base text-orange-300 max-w-xl mx-auto flex items-center justify-center gap-2">
        📍 Blok D3 No.17, Jl. Semeru III, Jatimulya, 
        Kec. Tambun Selatan, Kab. Bekasi
        </p>
  </motion.div>
</motion.section>


      {/* ================= KEUNGGULAN ================= */}
      <motion.section
        className="px-6 py-20 rounded-t-3xl -mt-12"
        style={{ backgroundColor: "rgba(255, 171, 87, 0.75)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          style={{ color: "#000000ff" }}
          variants={fadeUp}
        >
          Kenapa Memilih Kami?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {[
            {
              title: "Produk Berkualitas",
              desc: "Hanya konsol PS3 dan PS4 terbaik untuk pengalaman bermain tanpa kendala.",
              icon: "/game.png",
            },
            {
              title: "Rental PS Praktis",
              desc: "Proses cepat, harga bersahabat, dan bisa langsung main.",
              icon: "/buttons.png",
            },
            {
              title: "Teman Setia Petualangan",
              desc: "Siap menemani mabar hingga solo gaming.",
              icon: "/hand.png",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#1a1a1a]/70 p-6 rounded-xl shadow border border-[#FFA64D]/30
                         hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center"
              variants={fadeUp}
              transition={{ delay: i * 0.2 }}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold" style={{ color: "#FFD7A1" }}>
                {item.title}
              </h3>
              <p className="text-gray-300 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-6 text-gray-400 text-sm bg-black/30">
        © {new Date().getFullYear()} Rental Playstation 4RJCUS — All Rights
        Reserved.
        <div className="mt-2">
          <Link
            href="/login"
            className="text-gray-500 hover:text-white text-xs"
          >
            Admin Login
          </Link>
        </div>
      </footer>
    </main>
  );
}
