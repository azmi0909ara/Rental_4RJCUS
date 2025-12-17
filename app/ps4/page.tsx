"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import ps4Games from "../data/ps4Games";

export default function PS4Page() {
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

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Breadcrumb + Back Button */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-300">
              Category &gt; PS4
            </p>
            <Link href="/category">
              <button className="bg-orange-400 text-black px-3 py-1 rounded-lg text-sm hover:bg-orange-500 transition flex items-center gap-1">
                ← Kembali
              </button>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-12 text-[#FFD7A1]">
            Game Playstation 4
          </h1>

          {/* Cards */}
<div className="grid md:grid-cols-3 gap-8">
  {ps4Games.map((game, index) => (
    <div
      key={index}
      className="
        bg-[#1a1a1a]/80 
        p-4 
        rounded-2xl 
        shadow-lg 
        border border-[#FFA64D]/30
        hover:scale-105 hover:shadow-2xl transition-all duration-300
        backdrop-blur-sm
        flex flex-col items-center
        h-[360px]
      "
    >
      {/* Cover Wrapper */}
      <div className="w-[250px] h-[220px] relative mb-4">
        <Image
          src={game.cover}
          alt={game.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      {/* Text Wrapper */}
      <div className="text-center flex flex-col justify-between flex-1">
        <h3 className="text-lg font-bold text-[#FFD7A1] leading-tight">
          {game.title}
        </h3>

        <p className="text-gray-300 text-sm mt-2">
          {game.genre}
        </p>
      </div>
    </div>
  ))}
</div>
</div>
      </main>
    </>
  );
}
