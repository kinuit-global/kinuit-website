import WorkHero from "@/components/sections/work/WorkHero";
import WorkGrid from "@/components/sections/work/WorkGrid";
import WorkCTA from "@/components/sections/work/WorkCTA";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-k-bg text-white">
      <WorkHero />
      <WorkGrid />
      <WorkCTA />
    </main>
  );
}
