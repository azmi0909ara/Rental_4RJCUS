"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Variants animasi
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <nav className="bg-white/50 backdrop-blur-md fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo Kiri */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/game.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2 cursor-pointer"
            />
          </Link>
          <Link href="/">
            <span className="text-black font-bold text-lg cursor-pointer">4RJCUS</span>
          </Link>
        </div>

        {/* Menu Tengah Desktop */}
        <ul className="hidden md:flex space-x-10 text-black font-medium">
          <li>
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/category" className="hover:text-orange-400 transition-colors">
              Category
            </Link>
          </li>
          <li>
            <Link href="/daftar-harga" className="hover:text-orange-400 transition-colors">
              Daftar Harga
            </Link>
          </li>
        </ul>

        {/* Logo Kanan / Mobile Hamburger */}
        <div className="flex items-center">
          {/** Hamburger hanya tampil di mobile */}
          <button
            className="md:hidden text-black text-2xl font-bold"
            onClick={toggleMenu}
          >
            {isOpen ? "×" : "≡"} {/* tanda X untuk close, ≡ untuk menu */}
          </button>

          {/** Logo kanan desktop */}
          <div className="hidden md:flex ml-4">
            <Link href="/">
              <Image src="/game.png" alt="Logo" width={40} height={40} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown dengan animasi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white/90 backdrop-blur-md w-full absolute top-full left-0 shadow-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center space-y-4 py-6 text-black font-medium">
              <li>
                <Link href="/" onClick={toggleMenu} className="hover:text-orange-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/category" onClick={toggleMenu} className="hover:text-orange-400 transition-colors">
                  Category
                </Link>
              </li>
              <li>
                <Link href="/daftar-harga" onClick={toggleMenu} className="hover:text-orange-400 transition-colors">
                  Daftar Harga
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
