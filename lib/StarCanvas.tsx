"use client";
import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Mesh Gradients (Moving Blobs) */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-20%] left-[-10%] w-full max-w-[1000px] h-[800px] rounded-[100%] bg-blue-600/20 blur-[130px]"
      />
      
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-full max-w-[900px] h-[700px] rounded-[100%] bg-blue-500/15 blur-[120px]"
      />

      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-[100%] bg-blue-400/10 blur-[100px]"
      />

      <div
        className="absolute bottom-0 inset-x-0 h-[50%] pointer-events-none z-1"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.6) 40%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 inset-x-0 h-[40%] pointer-events-none z-2"
        style={{
          background:
            "radial-gradient(ellipse 80% 120% at 50% 100%, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0.12) 35%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-4"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #080a18 100%)",
        }}
      />
    </div>
  );
}
