"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Build", href: "/services/build" },
  { label: "Design", href: "/services/design" },
  { label: "Grow", href: "/services/grow" },
  { label: "Plan", href: "/services/plan" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kinuit-global", icon: <Linkedin size={18} /> },
  { label: "Instagram", href: "https://www.instagram.com/kinuit_global/", icon: <Instagram size={18} /> },
  { label: "Twitter", href: "https://x.com/kinuit_global", icon: <Twitter size={18} /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const hoverEffect = { scale: 1.05, y: -3, transition: { duration: 0.3 } };

  return (
    <footer className="relative bg-[#0e1114] border-t border-[#1f2937] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h2
              className="uppercase text-white text-2xl font-semibold"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              <Image
                src="/logo.png"
                alt="logo img"
                width={220}
                height={220}
                className="object-contain w-[160px] sm:w-[180px] lg:w-[175px] transition-all duration-300 brightness-0 invert"
              />
            </h2>

            <p
              className="text-slate-400 text-sm leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              We are the experts who design your brand, build your tech, and
              grow your audience. From every corner of the world, we work as one
              to make your next big move happen.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-3 pt-3 flex-wrap">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={hoverEffect}
                  aria-label={social.label}
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-full
                    bg-[#15191e] border border-[#263140]
                    text-slate-400 hover:text-white
                    hover:bg-[#081ff0] hover:border-transparent
                    transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-6 uppercase tracking-wider">
              Navigation
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={hoverEffect}
                  className="cursor-pointer"
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* EXPERTISE */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-6 uppercase tracking-wider">
              Expertise
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <motion.li
                  key={service.label}
                  whileHover={hoverEffect}
                  className="cursor-pointer"
                >
                  <Link
                    href={service.href}
                    className="text-slate-400 text-sm hover:text-white transition"
                  >
                    {service.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-6 uppercase tracking-wider">
              Get In Touch
            </h3>

            <div className="space-y-4 text-sm text-slate-400">
              <a href="mailto:hello@kinuit.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#15191e] border border-[#263140] group-hover:bg-[#081ff0] group-hover:border-[#081ff0] group-hover:text-white font-black italic transition-colors">
                  @
                </span>
                hello@kinuit.com
              </a>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#15191e] border border-[#263140] shrink-0">
                  📍
                </span>
                <span className="text-sm">Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-[#1f2937] my-10" />

        {/* COPYRIGHT */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 uppercase tracking-[0.15em] font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-center">© Copyright {currentYear} Kinuit Global. All Rights Reserved.</p>

          <div className="flex gap-8">
            <Link
              href="/terms"
              className="cursor-pointer hover:text-white transition"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="cursor-pointer hover:text-white transition"
            >
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

