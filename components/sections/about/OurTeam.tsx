"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { Users, Terminal, Circle } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const team = [
  {
    name: "Arjun K.",
    role: "Lead Strategist",
    bio: "Arjun leads brand evolution through data-backed strategies and creative vision, ensuring every move is calculated for growth.",
    image: "https://ui-avatars.com/api/?name=Arjun+K&background=081FF0&color=fff&size=200",
    initials: "AK"
  },
  {
    name: "Priya M.",
    role: "Creative Director",
    bio: "Priya crafts digital identities that resonate and inspire across global markets, bringing a premium aesthetic to every project.",
    image: "https://ui-avatars.com/api/?name=Priya+M&background=081FF0&color=fff&size=200&rounded=true",
    initials: "PM"
  },
  {
    name: "Dev R.",
    role: "Tech Lead",
    bio: "Dev architects high-performance digital products engineered for the new era, specializing in scalable Next.js and Web3 systems.",
    image: "https://ui-avatars.com/api/?name=Dev+R&background=081FF0&color=fff&size=200",
    initials: "DR"
  },
  {
    name: "Sarah L.",
    role: "Growth Head",
    bio: "Sarah optimizes digital ecosystems for maximum visibility and conversion, driving results for ambitious global brands.",
    image: "https://ui-avatars.com/api/?name=Sarah+L&background=081FF0&color=fff&size=200",
    initials: "SL"
  }
];

const TeamTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const allLines = [
    "$ kinuit --get-team-status",
    "> 4 Core Strategic Units Active",
    "> All Systems [OK]",
    "$ kinuit --vision",
    "> Engineering the new era for ambitious brands."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < allLines.length) {
        const lineToAdd = allLines[currentLine];
        if (lineToAdd) {
          setLines(prev => [...prev, lineToAdd]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-20 bg-slate-950/90 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs md:text-sm">
      <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-2">
          <Circle size={10} className="fill-red-500/50 text-red-500/20" />
          <Circle size={10} className="fill-yellow-500/50 text-yellow-500/20" />
          <Circle size={10} className="fill-green-500/50 text-green-500/20" />
        </div>
        <div className="text-white/20 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
          <Terminal size={12} />
          system_console
        </div>
      </div>
      <div className="p-6 space-y-3 min-h-[180px]">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={line?.startsWith("$") ? "text-k-primary" : "text-k-text-muted"}
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-4 bg-k-primary inline-block align-middle ml-1"
        />
      </div>
    </div>
  );
};

export default function OurTeam() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-24" id="team">
      <Container>
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <SectionBadge icon={<Users size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="The People" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-k-text leading-tight mb-12">
            Meet the <span className="text-k-primary">Standard</span> Team.
          </h2>
          
          <TeamTerminal />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {team.map((member, idx) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group bg-k-card-bg/50 p-6 rounded-3xl border border-k-border hover:border-k-primary/20 transition-all duration-300 shadow-sm"
            >
              <div className="w-32 h-32 rounded-2xl bg-k-card-bg border border-k-border mb-6 shadow-lg group-hover:border-k-primary/30 transition-all duration-500 overflow-hidden relative">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={128} 
                  height={128} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-xl font-bold text-k-text mb-1 tracking-tight group-hover:text-k-primary transition-colors">{member.name}</h3>
              <p className="text-k-primary text-[10px] font-black tracking-widest uppercase mb-3">{member.role}</p>
              <p className="text-k-text-muted text-xs leading-relaxed font-light">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

