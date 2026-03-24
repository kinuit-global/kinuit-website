import { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactSteps from "@/components/sections/contact/ContactSteps";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Get in Touch | Start Your Project",
  description: "Ready to move when you move. Contact Kinuit to start your branding, development, or strategy project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050D1A] text-white">
      <ContactHero />
      <ContactSteps />
      <ContactFormSection />
    </main>
  );
}
