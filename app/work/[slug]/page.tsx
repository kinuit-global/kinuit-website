import { getProjectBySlug, projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import WorkCTA from "@/components/sections/work/WorkCTA";
import ProjectDetail from "@/components/sections/work/ProjectDetail";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-k-bg text-k-text">
      <ProjectDetail project={project} />
      <WorkCTA />
    </main>
  );
}
