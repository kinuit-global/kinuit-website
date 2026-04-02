import LegalLayout from "@/components/ui/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 2026">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">1. Introduction</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          At Kinuit Global, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or interact with our services.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">2. Information We Collect</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">We may collect information in several ways:</p>
        <ul className="list-disc pl-6 text-white/70 space-y-3 mb-6">
          <li><strong className="text-white font-bold">Direct Collection:</strong> Information you provide when contacting us, signing up for our newsletter, or requesting a proposal (e.g., name, email, company details).</li>
          <li><strong className="text-white font-bold">Automated Collection:</strong> Standard web analytics data such as IP addresses, browser types, and pages visited to help us improve our website experience.</li>
          <li><strong className="text-white font-bold">Service Data:</strong> Data shared during the course of our engagement in design, development, or marketing projects.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">3. How We Use Your Information</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">We use the collected data to:</p>
        <ul className="list-disc pl-6 text-white/70 space-y-3 mb-6">
          <li>Provide and improve our professional services.</li>
          <li>Communicate project updates and marketing insights.</li>
          <li>Manage community engagements and brand operations.</li>
          <li>Ensure the security and performance of our digital products.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">4. Data Sharing and Third Parties</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          We do not sell your personal data. We only share information with third-party service providers (such as HubSpot, Salesforce, or hosting providers) necessary to deliver our services, and only under strict confidentiality agreements.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">5. Data Security</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          We implement industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure. As a tech-forward agency, we prioritize data integrity and smart architecture.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">6. Your Rights</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          Depending on your location, you may have rights under data protection laws (such as GDPR or CCPA) to access, correct, or delete your personal data. To exercise these rights, please contact us.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">7. Cookies</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          Our website uses cookies to enhance user experience and analyze traffic. You can choose to disable cookies through your browser settings, though this may impact some website functionality.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">8. Updates to This Policy</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The latest version will always be available on this page.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">9. Contact Us</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-6">
          If you have any questions about this Privacy Policy, please reach out to us at <strong className="text-white font-bold">hello@kinuit.com</strong>.
        </p>
      </section>
    </LegalLayout>
  );
}
