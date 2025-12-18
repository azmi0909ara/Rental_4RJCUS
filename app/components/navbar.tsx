"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const pathname = usePathname(); // untuk mengecek path saat ini

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Category", href: "/category" },
    { name: "Daftar Harga", href: "/daftar-harga" },
    { name: "Term & Condition", href: "/term" },
  ];

  // Variants animasi
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <nav className="bg-white/50 backdrop-blur-md fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py flex items-center justify-between">
        {/* Logo Kiri */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={40}
              className="mr-2 cursor-pointer object-cover"
            />
          </Link>
          <Link href="/">
            <span className="text-black font-bold text-lg cursor-pointer">
              4RJCUS
            </span>
          </Link>
        </div>

        {/* Menu Tengah Desktop */}
        <ul className="hidden md:flex space-x-10 text-black font-medium">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative after:block after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left ${
                  pathname === item.href ? "after:scale-x-100" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo Kanan / Mobile Hamburger */}
        <div className="flex items-center">
          <button
            className="md:hidden text-black text-2xl font-bold"
            onClick={toggleMenu}
          >
            {isOpen ? "×" : "≡"} {/* tanda X untuk close, ≡ untuk menu */}
          </button>

          {/* Logo kanan desktop */}
          <div className="hidden md:flex ml-4">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={40}
                className="cursor-pointer object-cover"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
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
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className={`relative after:block after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left ${
                      pathname === item.href ? "after:scale-x-100" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
