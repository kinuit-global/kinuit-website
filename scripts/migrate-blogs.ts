import { blogPosts } from "../lib/blog";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const blogsWithUuid = blogPosts.map((post) => ({
  ...post,
  id: uuidv4(),
  metaTitle: post.title,
  metaDescription: post.excerpt,
  keywords: `${post.category.toLowerCase()}, strategy, business, growth`,
}));

const targetPath = path.join(process.cwd(), "data", "blogs.json");
fs.writeFileSync(targetPath, JSON.stringify(blogsWithUuid, null, 2));

console.log(`Migrated ${blogsWithUuid.length} posts to ${targetPath}`);
