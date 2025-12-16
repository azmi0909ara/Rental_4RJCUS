"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function CategoryPage() {
  const psList = [
    {
      title: "Playstation 3",
      desc: "Konsol sederhana",
      icon: "/ps3.png",
      detailLink: "/ps3",
    },
    {
      title: "Playstation 4",
      desc: "Konsol modern",
      icon: "/ps4.png",
      detailLink: "/ps4",
    },
    {
      title: "Playstation 5",
      desc: "Coming soon",
      icon: "/ps5.png",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 relative min-h-screen">

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90 z-0"
          style={{ backgroundImage: "url('/bkg2.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl font-extrabold text-center mb-12 text-[#FFD7A1]">
            Kategori Playstation
          </h1>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {psList.map((ps, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a]/80 p-6 rounded-2xl shadow-lg border border-[#FFA64D]/30 
                           hover:scale-105 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm flex flex-col items-center"
              >
                {/* ICON */}
                <Image src={ps.icon} alt={ps.title} width={80} height={80} className="mb-4" />

                {/* TITLE */}
                <h3 className="text-2xl font-bold mb-2 text-[#FFD7A1]">{ps.title}</h3>

                {/* DESCRIPTION */}
                <p className="text-gray-300 text-center mb-4">{ps.desc}</p>

                {/* BUTTON DETAIL (di dalam card, bawah deskripsi) */}
                {ps.detailLink && (
                  <Link href={ps.detailLink} className="w-full">
                    <button className="w-full bg-orange-400 text-black font-semibold px-3 py-2 rounded-lg text-sm hover:bg-orange-500 transition flex items-center justify-center gap-1">
                      Detail Lebih Lanjut <span className="text-xl">→</span>
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
