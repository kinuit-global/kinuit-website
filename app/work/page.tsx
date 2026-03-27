import { Metadata } from "next";
import WorkHero from "@/components/sections/work/WorkHero";
import WorkGrid from "@/components/sections/work/WorkGrid";
import WorkCTA from "@/components/sections/work/WorkCTA";

export const metadata: Metadata = {
  title: "Our Work | Case Studies",
  description: "Case studies and selected work from Kinuit — real projects, real results for ambitious brands globally.",
};


export default function WorkPage() {
  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <WorkHero />
      <WorkGrid />
      <WorkCTA />
    </main>
  );
}
