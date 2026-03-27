import { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactSteps from "@/components/sections/contact/ContactSteps";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Get in Touch | Start Your Project",
  description: "Start your next project with Kinuit. No long forms. No sales pitch. Just a direct conversation about your brand.",
};


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <ContactHero />
      <ContactSteps />
      <ContactFormSection />
    </main>
  );
}
