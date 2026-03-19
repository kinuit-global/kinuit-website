import ContactHero from "@/components/sections/contact/ContactHero";
import ContactSteps from "@/components/sections/contact/ContactSteps";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050D1A] text-white">
      <ContactHero />
      <ContactSteps />
      <ContactFormSection />
    </main>
  );
}
