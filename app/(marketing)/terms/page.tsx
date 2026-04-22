import LegalLayout from "@/components/ui/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="March 2026">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">1. Acceptance of Terms</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          By accessing and using the services provided by Kinuit Global ("Kinuit", "we", "us", or "our"), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">2. Our Services</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          Kinuit provides a wide range of professional services, including but not limited to:
        </p>
        <ul className="list-disc pl-6 text-k-text-muted space-y-3 mb-6">
          <li><strong className="text-k-text font-bold">Build:</strong> Custom websites, mobile apps, AI products, Web3 development, and e-commerce solutions.</li>
          <li><strong className="text-k-text font-bold">Design:</strong> Brand identity, UX/UI design, motion graphics, and creative assets.</li>
          <li><strong className="text-k-text font-bold">Grow:</strong> SEO, paid advertising, social media marketing, and community management.</li>
          <li><strong className="text-k-text font-bold">Plan:</strong> Growth strategy, go-to-market planning, and tokenomics.</li>
          <li><strong className="text-k-text font-bold">Manage:</strong> CRM integration (HubSpot/Salesforce) and brand operations.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">3. Intellectual Property</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          Unless otherwise agreed upon in a specific Service Agreement, all final deliverables provided to the Client upon full payment shall be considered "work for hire" and the property of the Client. Kinuit retains the right to display the work in our portfolio and marketing materials unless a non-disclosure agreement (NDA) is in place.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">4. Client Responsibilities</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          Clients must provide accurate information and timely feedback to ensure project milestones are met. Delays in providing necessary assets or approvals may impact delivery schedules.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">5. Payment Terms</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          Service fees are detailed in individual project proposals or Master Service Agreements (MSA). Standard payment terms require an initial deposit before work commences, with subsequent payments based on milestones or monthly retainers.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">6. Limitation of Liability</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          Kinuit Global shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, including but not limited to loss of profits or data.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">7. Governing Law</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          These terms are governed by the laws of the jurisdiction in which Kinuit Global operates. As a remote-first, globally distributed team, we ensure compliance with international standards for digital service delivery.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-k-text tracking-tight">8. Contact Us</h2>
        <p className="text-k-text-muted text-lg leading-relaxed mb-6">
          For any questions regarding these Terms & Conditions, please contact us at <strong className="text-k-text font-bold">hello@kinuit.com</strong>.
        </p>
      </section>
    </LegalLayout>
  );
}
