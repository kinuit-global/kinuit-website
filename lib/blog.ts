import blogsData from "../data/blogs.json";

export interface BlogPost {
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

export const getBlogPosts = (): BlogPost[] => {
  return [...blogsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as BlogPost[];
};

export const blogPosts: BlogPost[] = getBlogPosts();
