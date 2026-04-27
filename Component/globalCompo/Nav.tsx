"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { servicesItem, createSlug } from "@/lib/service";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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
          ? "bg-k-bg/80 backdrop-blur-xl py-4 border-b border-k-border"
          : "bg-transparent py-4 sm:py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">
          {/* Logo - Left aligned */}
          <div className="flex-1 flex justify-start">
            <Link href="/" aria-label="Kinuit Home">
              <motion.div
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/logo.png"
                  alt="logo img"
                  width={180}
                  height={180}
                  className="object-contain w-[110px] sm:w-[130px] lg:w-[135px] transition-all duration-300"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Nav - Perfectly Centered */}
          <nav className="hidden lg:flex flex-1 justify-center items-center">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isServices = link.label === "Service";

                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => isServices && setServicesOpen(true)}
                    onMouseLeave={() => isServices && setServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={() => isServices && setServicesOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-4 py-2 flex items-center justify-center whitespace-nowrap text-[15px] transition-all duration-300 group rounded-full outline-none focus-visible:ring-2 focus-visible:ring-k-primary ${isActive
                        ? "text-[#081ff0]"
                        : "text-k-text-muted hover:text-k-text"
                        }`}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-[#081ff0]/5 border border-[#081ff0]/10 rounded-full"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>

                      <span className="absolute inset-0 bg-k-primary/0 group-hover:bg-k-primary/5 transition-colors duration-300 rounded-full -z-10" />

                      <div className="relative z-10 flex items-center gap-1">
                        <span className="tracking-wide font-medium">{link.label}</span>
                        {isServices && (
                          <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} 
                          />
                        )}
                      </div>
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {isServices && (
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[100]"
                          >
                            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-8 w-[720px] grid grid-cols-2 gap-x-12 gap-y-8">
                              {servicesItem.map((service) => (
                                <div key={service.title} className="flex flex-col gap-4">
                                  <Link 
                                    href={`/services/${createSlug(service.title)}`}
                                    onClick={() => setServicesOpen(false)}
                                    className="group/item flex items-center gap-4"
                                  >
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#081ff0]/5 flex items-center justify-center text-[#081ff0] group-hover/item:bg-[#081ff0] group-hover/item:text-white transition-all">
                                      <service.icon size={20} />
                                    </div>
                                    <h4 className="text-sm font-black text-slate-900 group-hover/item:text-[#081ff0] transition-colors uppercase tracking-widest">
                                      {service.title}
                                    </h4>
                                  </Link>
                                  
                                  <div className="flex flex-wrap gap-x-3 gap-y-2 ml-14">
                                    {service.tags.map((tag) => (
                                      <Link
                                        key={tag}
                                        href={`/services/${createSlug(tag)}`}
                                        onClick={() => setServicesOpen(false)}
                                        className="text-[11px] text-slate-500 hover:text-[#081ff0] hover:underline underline-offset-4 font-medium transition-colors whitespace-nowrap"
                                      >
                                        {tag}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              
                              <div className="col-span-2 mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#081ff0] animate-pulse" />
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    Next-Gen Agency Solutions
                                  </p>
                                </div>
                                <Link href="/services" onClick={() => setServicesOpen(false)} className="text-[11px] font-black uppercase tracking-widest text-[#081ff0] hover:translate-x-1 transition-transform flex items-center gap-2">
                                  Explore All Services <ArrowRight size={12} />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
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
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(8, 31, 240, 0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 h-12 flex items-center justify-center bg-[#081ff0] text-white text-sm font-bold rounded-full transition-all duration-300 shadow-lg shadow-[#081ff0]/20"
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
            className="fixed inset-0 z-40 bg-k-bg/95 backdrop-blur-2xl flex flex-col items-center lg:hidden px-6 pt-24 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                const isServices = link.label === "Service";

                return (
                  <div key={link.label} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => !isServices && setMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className="w-full text-center"
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`text-3xl font-light hover:text-k-text transition-colors cursor-pointer block py-2 whitespace-nowrap ${isActive ? "text-[#081ff0] font-black" : "text-k-text-muted"
                          }`}
                        onClick={(e) => {
                          if (isServices) {
                            e.preventDefault();
                            setServicesOpen(!servicesOpen);
                          }
                        }}
                      >
                        <div className="flex items-center justify-center gap-3">
                          {link.label}
                          {isServices && (
                            <ChevronDown 
                              size={24} 
                              className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} 
                            />
                          )}
                        </div>
                      </motion.span>
                    </Link>

                    {/* Mobile Services Submenu */}
                    {isServices && (
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-slate-50 rounded-2xl mt-2"
                          >
                            <div className="flex flex-col gap-3 p-4">
                              {servicesItem.map((service) => (
                                <div key={service.title} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                                  <Link 
                                    href={`/services/${createSlug(service.title)}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 mb-3"
                                  >
                                    <div className="w-10 h-10 rounded-xl bg-[#081ff0]/5 flex items-center justify-center text-[#081ff0]">
                                      <service.icon size={20} />
                                    </div>
                                    <span className="font-black uppercase tracking-widest text-sm text-slate-900">{service.title}</span>
                                    <ArrowRight size={14} className="ml-auto text-slate-300" />
                                  </Link>
                                  
                                  <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag) => (
                                      <Link
                                        key={tag}
                                        href={`/services/${createSlug(tag)}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 active:bg-[#081ff0] active:text-white transition-all"
                                      >
                                        {tag}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              
                              <Link 
                                href="/services" 
                                onClick={() => {
                                  setMenuOpen(false);
                                  setServicesOpen(false);
                                }}
                                className="mt-2 py-4 bg-[#081ff0]/5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#081ff0]"
                              >
                                Full Service Catalog <ArrowRight size={14} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              <Link href="/contact">
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 px-10 py-4 bg-[#081ff0] text-white font-bold rounded-full cursor-pointer block text-center shadow-xl shadow-[#081ff0]/20"
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
