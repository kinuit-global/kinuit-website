import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Kinuit Global",
  description: "Insights, strategies, and perspectives from the Kinuit team on branding, development, and growth.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
