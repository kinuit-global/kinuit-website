"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  //   { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#050D1A]/90 backdrop-blur-xl py-4"
          : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/logoj.png"
                alt="logo img"
                width={220}
                height={220}
                className="object-contain w-[160px] sm:w-[180px] lg:w-[175px]"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 flex items-center justify-center text-[15px] transition-all duration-300 group rounded-full overflow-hidden ${isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                    }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 rounded-full -z-10" />

                  <span className="relative z-10 tracking-wide font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(8, 31, 240, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 h-12 flex items-center justify-center bg-linear-to-r from-[#081FF0] to-[#2563EB] text-white text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(8,31,240,0.3)]"
              >
                Let's Talk
              </motion.button>
            </Link>
          </div>

          {/* Mobile/Tablet Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile/Tablet Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050D1A]/98 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden px-6"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <Link key={link.label} href={link.href}>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className={`text-3xl font-light hover:text-white transition-colors cursor-pointer ${pathname === link.href ? "text-white" : "text-white/80"
                      }`}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <Link href="/contact">
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 px-10 py-4 bg-linear-to-r from-[#081FF0] to-[#2563EB] text-white font-bold rounded-full cursor-pointer block text-center shadow-[0_0_20px_rgba(8,31,240,0.4)]"
                >
                  Let's Talk
                </motion.span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}