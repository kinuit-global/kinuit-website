"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const quickLinks = ["Service", "Resources", "About us"];
const services = ["Service", "Resources", "About us"];

const socials = [
  { label: "X", href: "#", img: "/xtwi.png" },
  { label: "Facebook", href: "#", img: "/git.png" },
  { label: "Instagram", href: "#", img: "/insta.png" },
  { label: "LinkedIn", href: "#", img: "/in.png" },
  { label: "TikTok", href: "#", img: "/git.png" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants for the entire footer
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  // Hover animation for links and icons
  const hoverEffect = { scale: 1.05, y: -3, transition: { duration: 0.3 } };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      // variants={containerVariants}
      className="relative bg-[#070B14] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h2
              className="text-white text-xl font-semibold"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Your Vision. Our Work. One Team.
            </h2>

            <p
              className="text-white text-sm leading-relaxed max-w-sm"
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
                  whileHover={hoverEffect}
                  aria-label={social.label}
                  className="
                    flex items-center justify-center
                    w-10 h-10 sm:w-11 sm:h-11
                    rounded-full
                    bg-white/5 border border-white/10
                    text-white/70 hover:text-white
                    hover:bg-white/10
                    transition-all duration-300
                    backdrop-blur-md"
                >
                  <Image
                    src={social.img}
                    alt={social.label}
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <motion.li
                  key={item}
                  whileHover={hoverEffect}
                  className="cursor-pointer"
                >
                  <Link
                    href="#"
                    className="text-[#B9B3B3] text-sm hover:text-white transition"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">
              Our Services
            </h4>

            <ul className="space-y-3">
              {services.map((item) => (
                <motion.li
                  key={item}
                  whileHover={hoverEffect}
                  className="cursor-pointer"
                >
                  <Link
                    href="#"
                    className="text-[#B9B3B3] text-sm hover:text-white transition"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm text-white/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                  ✉
                </span>
                contact@youremail.com
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                  ☎
                </span>
                +91 1234567890
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/10 my-8" />

        {/* COPYRIGHT */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>© Copyright {currentYear}. All Rights Reserved by Kinuit</p>

          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={hoverEffect}
              className="cursor-pointer hover:text-white transition"
            >
              Terms & Conditions
            </motion.a>
            <motion.a
              href="#"
              whileHover={hoverEffect}
              className="cursor-pointer hover:text-white transition"
            >
              Privacy Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
