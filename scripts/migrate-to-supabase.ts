import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

// Load environment variables manually since we might run this directly via tsx
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function migrateData() {
  try {
    console.log("Starting data migration...");

    // 1. Migrate Testimonials
    const testimonialsPath = path.join(process.cwd(), 'data', 'testimonials.json');
    try {
      const tData = await fs.readFile(testimonialsPath, 'utf-8');
      const parsed = JSON.parse(tData);
      const testimonials = parsed.submissions || [];
      
      console.log(`Found ${testimonials.length} testimonials. Migrating...`);
      
      for (const t of testimonials) {
        const record = {
          id: t.id,
          full_name: t.fullName,
          phone: t.phone,
          email: t.email,
          company_name: t.companyName,
          testimonial: t.testimonial,
          submitted_at: t.submittedAt,
          attachments: t.attachments,
        };
        
        const { error } = await supabase.from('testimonials').upsert([record]);
        if (error) {
          console.error(`Error migrating testimonial ${t.id}:`, error);
        }
      }
      console.log("Testimonials migration complete.");
    } catch (e: any) {
      if (e.code === 'ENOENT') console.log("No testimonials.json found, skipping.");
      else console.error("Error reading testimonials:", e);
    }

    // 2. Migrate Case Studies
    const caseStudiesPath = path.join(process.cwd(), 'data', 'case-studies.json');
    try {
      const cData = await fs.readFile(caseStudiesPath, 'utf-8');
      const caseStudies = JSON.parse(cData) || [];
      
      console.log(`Found ${caseStudies.length} case studies. Migrating...`);
      
      for (const c of caseStudies) {
        const record = {
          id: c.id,
          slug: c.slug,
          title: c.title,
          excerpt: c.excerpt,
          category: c.category,
          date: c.date,
          read_time: c.readTime,
          image: c.image,
          content: c.content,
          author: c.author,
          meta_title: c.metaTitle,
          meta_description: c.metaDescription,
          keywords: c.keywords
        };
        
        const { error } = await supabase.from('case_studies').upsert([record]);
        if (error) {
          console.error(`Error migrating case study ${c.id}:`, error);
        }
      }
      console.log("Case studies migration complete.");
    } catch (e: any) {
      if (e.code === 'ENOENT') console.log("No case-studies.json found, skipping.");
      else console.error("Error reading case studies:", e);
    }

    console.log("Migration finished successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrateData();
