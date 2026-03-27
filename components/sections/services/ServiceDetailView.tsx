"use client";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ServiceDetail, createSlug } from "@/lib/service";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Zap } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ServiceDetailView({
  service,
  parentCategory,
  relatedServices
}: {
  service: ServiceDetail,
  parentCategory?: { name: string, href: string }
  relatedServices?: string[]
}) {
  return (
    <>
      <section className="bg-k-bg pt-40 pb-20 md:pt-48 md:pb-20 border-b border-k-border">
        <Container>
          <div className="max-w-4xl flex flex-col items-start text-left">
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <Breadcrumb paths={[
                { name: "Services", href: "/services" },
                ...(parentCategory ? [parentCategory] : []),
                { name: service.title }
              ]} />
            </motion.div>

            <SectionBadge icon={<Zap size={14} className="text-k-primary group-hover:scale-110 transition-transform duration-300" />} label={service.category} />

            <motion.h1 {...fadeUp} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-k-text leading-tight tracking-tight">
              {service.title}
            </motion.h1>
          </div>
        </Container>
      </section>

      <Section className="bg-k-bg py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full aspect-video md:aspect-21/9 rounded-4xl overflow-hidden mb-20 shadow-2xl dark:shadow-none border border-k-border"
          >
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-k-text">Overview</h2>
              <p className="text-k-text-muted text-lg leading-relaxed">{service.description}</p>

              <h3 className="text-xl font-bold text-k-text mt-12 mb-6 tracking-wide underline underline-offset-8 decoration-k-primary/30">Key Benefits</h3>
              <div className="grid grid-cols-1 gap-4 mb-12">
                {service.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-k-card-bg border border-k-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-k-primary/50" />
                    <span className="text-k-text-muted text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {relatedServices && relatedServices.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-k-text mt-12 mb-6 tracking-wide underline underline-offset-8 decoration-k-primary/30">
                    Other {service.category} Services
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {relatedServices.map((related, i) => (
                      <Link
                        key={i}
                        href={`${parentCategory?.href}/${createSlug(related)}`}
                        className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${createSlug(related) === service.slug
                          ? "bg-k-primary/20 border-k-primary/50 pointer-events-none"
                          : "bg-k-card-bg border-k-border hover:border-k-primary/50 hover:bg-k-primary/10"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${createSlug(related) === service.slug ? "bg-k-primary" : "bg-k-text/20"} group-hover:scale-125 transition-transform`} />
                          <span className={`text-lg transition-colors font-medium ${createSlug(related) === service.slug ? "text-k-text" : "text-k-text-muted group-hover:text-k-text"}`}>
                            {related}
                          </span>
                        </div>
                        {createSlug(related) !== service.slug && (
                          <ArrowUpRight size={18} className="text-k-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {service.expertise && service.expertise.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-k-text mt-12 mb-6 tracking-wide underline underline-offset-8 decoration-k-primary/30">Expertise In</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {service.expertise.map((item, i) => (
                      <Link
                        key={i}
                        href={`/services/${createSlug(item)}`}
                        className="group flex items-center justify-between p-4 rounded-xl bg-k-card-bg border border-k-border hover:border-k-primary/50 hover:bg-k-primary/10 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-k-primary" />
                          <span className="text-k-text-muted group-hover:text-k-text text-lg transition-colors font-medium">{item}</span>
                        </div>
                        <ArrowUpRight size={18} className="text-k-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="p-8 md:p-12 rounded-4xl bg-k-card-bg border border-k-border shadow-sm"
            >
              <h2 className="text-2xl font-bold tracking-tight text-k-text mb-10">Our Implementation Process</h2>
              <div className="space-y-8">
                {service.process.map((step, i) => (
                  <div key={i} className="flex flex-row gap-6 items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-k-border bg-k-bg text-k-primary font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div className="pt-2 text-k-text font-medium text-lg w-full pb-8 border-b border-k-border last:border-0 last:pb-0">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}
