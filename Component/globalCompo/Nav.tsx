"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/logoj.png");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (resolvedTheme === "light") {
      setLogoSrc("/logo-light.svg");
    } else {
      setLogoSrc("/logoj.png");
    }
  }, [resolvedTheme]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-k-bg/80 backdrop-blur-xl py-4 border-b border-k-border"
          : "bg-transparent py-4 sm:py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">
          {/* Logo - Left aligned */}
          <div className="flex-1 flex justify-start">
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={logoSrc}
                  alt="logo img"
                  width={220}
                  height={220}
                  key={logoSrc}
                  className="object-contain w-[160px] sm:w-[180px] lg:w-[175px] transition-all duration-300"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Nav - Perfectly Centered */}
          <nav className="hidden lg:flex flex-1 justify-center items-center">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-4 py-2 flex items-center justify-center text-[15px] transition-all duration-300 group rounded-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-k-primary ${isActive
                      ? "text-k-text"
                      : "text-k-text-muted hover:text-k-text"
                      }`}
                  >

                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-k-glass-bg border border-k-glass-border rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover background */}
                    <span className="absolute inset-0 bg-k-primary/0 group-hover:bg-k-primary/5 transition-colors duration-300 rounded-full -z-10" />

                    <span className="relative z-10 tracking-wide font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Actions - Right aligned */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {/* <ThemeToggle /> */}

            {/* Desktop CTA */}
            <div className="hidden lg:block ml-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(30, 80, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 h-12 flex items-center justify-center bg-linear-to-r from-k-primary to-[#2563EB] text-white text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(30,80,255,0.2)]"
                >
                  Let's Talk
                </motion.button>
              </Link>
            </div>

            {/* Mobile/Tablet Hamburger */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* <ThemeToggle /> */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-k-text rounded-full origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 bg-k-text rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-k-text rounded-full origin-center"
                />
              </button>
            </div>
          </div>
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
            className="fixed inset-0 z-40 bg-k-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden px-6"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.label} 
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className="w-full text-center"
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={`text-3xl font-light hover:text-k-text transition-colors cursor-pointer block py-2 ${isActive ? "text-k-text font-medium" : "text-k-text-muted"
                        }`}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                );
              })}

              <Link href="/contact">
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 px-10 py-4 bg-linear-to-r from-k-primary to-[#2563EB] text-white font-bold rounded-full cursor-pointer block text-center shadow-[0_0_20px_rgba(30,80,255,0.3)]"
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
