import { supabasePublic } from "@/lib/supabase/public";

export interface CaseStudy {
  id: string; // UUID
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

export const getCaseStudies = async (filters?: { category?: string, query?: string }): Promise<CaseStudy[]> => {
  let query = supabasePublic
    .from("case_studies")
    .select("*");

  if (filters?.category && filters.category !== "ALL") {
    query = query.eq("category", filters.category);
  }

  if (filters?.query) {
    query = query.or(`title.ilike.%${filters.query}%,excerpt.ilike.%${filters.query}%,content.ilike.%${filters.query}%`);
  }

  const { data, error } = await query.order("date", { ascending: false });

  if (error) {
    console.error("Error fetching case studies from Supabase:", JSON.stringify(error, null, 2));
    return [];
  }
  
  // Map snake_case to camelCase
  return data.map((item: any) => ({
    ...item,
    readTime: item.read_time,
    metaTitle: item.meta_title,
    metaDescription: item.meta_description
  })) as CaseStudy[];
};

// We cannot export a static caseStudies array anymore since it's async,
// Components using this need to be updated to await getCaseStudies()
// Let's keep a placeholder or just remove it and fix imports.
export const caseStudies: CaseStudy[] = [];
