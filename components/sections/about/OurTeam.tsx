"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Arjun K.",
    role: "Lead Strategist",
    bio: "Driving brand evolution through data-backed strategies and creative vision.",
    initials: "AK"
  },
  {
    name: "Priya M.",
    role: "Creative Director",
    bio: "Crafting digital identities that resonate and inspire across global markets.",
    initials: "PM"
  },
  {
    name: "Dev R.",
    role: "Tech Lead",
    bio: "Architecting high-performance digital products engineered for the new era.",
    initials: "DR"
  }
];

export default function OurTeam() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-24">
      <Container>
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <SectionBadge icon={Users} label="The People" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-k-text leading-tight">
            Meet the <span className="text-k-primary">Standard</span> Team.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-40 h-40 rounded-3xl bg-k-card-bg border border-k-border flex items-center justify-center mb-8 shadow-xl group-hover:border-k-primary/30 group-hover:shadow-k-primary/5 transition-all duration-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-k-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-3xl font-black text-k-text/20 group-hover:text-k-primary/40 transition-colors uppercase tracking-widest">{member.initials}</span>
              </div>
              <h3 className="text-2xl font-bold text-k-text mb-2 tracking-tight group-hover:text-k-primary transition-colors">{member.name}</h3>
              <p className="text-k-primary text-xs font-black tracking-widest uppercase mb-4">{member.role}</p>
              <p className="text-k-text-muted text-sm leading-relaxed max-w-[250px] font-light">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
