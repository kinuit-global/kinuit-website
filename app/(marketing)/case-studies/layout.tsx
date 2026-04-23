import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Kinuit Global",
  description: "Case studies, strategies, and perspectives from the Kinuit team on branding, development, and growth.",
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
