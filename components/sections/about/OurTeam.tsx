"use client";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionBadge from "@/components/ui/SectionBadge";
import { Users, Linkedin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { team } from "@/lib/team";

export default function OurTeam() {
  return (
    <Section className="bg-k-bg border-t border-k-border py-24" id="team">
      <Container>
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <SectionBadge icon={<Users size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label="The People" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-k-text leading-tight mb-6">
            Meet the <span className="text-k-primary">Leadership</span> Team.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 justify-items-center">
          {team.map((member, idx) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="w-full flex flex-col items-center text-center group bg-k-card-bg/50 p-6 rounded-3xl border border-k-border hover:border-k-primary/20 transition-all duration-300 shadow-sm"
            >
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-32 h-32 rounded-2xl bg-k-card-bg border border-k-border mb-6 shadow-lg group-hover:border-k-primary/30 hover:border-k-primary/30 transition-all duration-500 overflow-hidden relative block"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </a>
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-k-card-bg border border-k-border mb-6 shadow-lg group-hover:border-k-primary/30 transition-all duration-500 overflow-hidden relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}

              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 hover:text-k-primary transition-colors"
                >
                  <h3 className="text-xl font-bold text-k-text tracking-tight group-hover:text-k-primary group-hover/link:text-k-primary transition-colors">
                    {member.name}
                  </h3>
                  <Linkedin size={15} className="text-k-text-muted group-hover:text-k-primary group-hover/link:text-k-primary transition-colors duration-300" />
                </a>
              ) : (
                <h3 className="text-xl font-bold text-k-text tracking-tight">
                  {member.name}
                </h3>
              )}

              <p className="text-k-primary text-[10px] font-black tracking-widest uppercase mt-1">{member.role}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

