import caseStudiesData from "../data/case-studies.json";

export interface CaseStudy {
  id: string; // Changed to string (UUID)
  slug: string;
  title: string;
  excerpt: string;
  category: "BUILD" | "DESIGN" | "GROW" | "PLAN";
  date: string;
  readTime: string;
  image: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export const getCaseStudies = (): CaseStudy[] => {
  return [...caseStudiesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as CaseStudy[];
};

export const caseStudies: CaseStudy[] = getCaseStudies();
