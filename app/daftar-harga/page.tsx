"use client";
import Link from "next/link";
import Navbar from "../components/navbar";

const priceData = [
  {
    category: "SEWA INAP PS 3",
    items: [
      { item: "PS + TV", duration: "12 jam (setengah hari)", price: "50k" },
      { item: "", duration: "24 jam (full seharian)", price: "80k" },
      { item: "PS AJA", duration: "12 jam (setengah hari)", price: "25k" },
      { item: "", duration: "24 jam (full seharian)", price: "50k" },
      { item: "", duration: "OVERTIME", price: "5k/jam" },
    ],
  },
  {
    category: "SEWA INAP PS 4",
    items: [
      { item: "PS + TV", duration: "12 jam (setengah hari)", price: "180k" },
      { item: "", duration: "24 jam (full seharian)", price: "120k" },
      { item: "PS AJA", duration: "12 jam (setengah hari)", price: "50k" },
      { item: "", duration: "24 jam (full seharian)", price: "80k" },
      { item: "", duration: "OVERTIME", price: "7k" },
    ],
  },
];

export default function DaftarHargaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 relative min-h-screen px-6">

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90 z-0"
          style={{ backgroundImage: "url('/bkg2.jpeg')" }}
        ></div>
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Breadcrumb + Back Button */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-300">
              Beranda &gt; Daftar Harga
            </p>
            <Link href="/">
              <button className="bg-orange-400 text-black px-3 py-1 rounded-lg text-sm hover:bg-orange-500 transition flex items-center gap-1">
                ← Kembali
              </button>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-12 text-[#FFD7A1]">
            Daftar Harga Rental Playstation
          </h1>

          {/* Price Table */}
          {priceData.map((section, index) => (
            <div key={index} className="mb-10 bg-[#1a1a1a]/80 p-6 rounded-2xl shadow-lg border border-[#FFA64D]/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 text-[#FFD7A1]">{section.category}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-200 border-collapse">
                  <thead>
                    <tr className="border-b border-[#FFA64D]/30">
                      <th className="py-2 px-4">Kategori</th>
                      <th className="py-2 px-4">Durasi</th>
                      <th className="py-2 px-4">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-[#FFA64D]/20 hover:bg-[#FFA64D]/10 transition">
                        <td className="py-2 px-4">{item.item}</td>
                        <td className="py-2 px-4">{item.duration}</td>
                        <td className="py-2 px-4">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
