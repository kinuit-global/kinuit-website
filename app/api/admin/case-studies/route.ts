import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('date', { ascending: false });
  
  if (error) {
    console.error("Supabase GET error:", JSON.stringify(error, null, 2));
    return NextResponse.json({ error: "Failed to fetch case studies", details: error }, { status: 500 });
  }

  const formatted = data.map((item: any) => ({
    ...item,
    readTime: item.read_time,
    metaTitle: item.meta_title,
    metaDescription: item.meta_description,
    isFeatured: item.is_featured ?? false
  }));
  
  return NextResponse.json(formatted);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createClient();
    
    const record: any = {
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      category: body.category,
      date: body.date,
      read_time: body.readTime,
      image: body.image,
      content: body.content,
      author: body.author,
      meta_title: body.metaTitle,
      meta_description: body.metaDescription,
      keywords: body.keywords,
      is_featured: body.isFeatured ?? false
    };

    if (body.id) record.id = body.id;
    
    const { data, error } = await supabase.from('case_studies').insert([record]).select().single();
    
    if (error) throw error;
    
    // Purge cache to show the new case study immediately
    revalidatePath('/');
    revalidatePath('/case-studies');
    revalidatePath(`/case-studies/${data.slug}`);
    revalidatePath('/case-studies/[slug]', 'page');
    
    return NextResponse.json({ success: true, caseStudy: data });
  } catch (error: any) {
    console.error("API POST Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create case study" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createClient();
    
    const record = {
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      category: body.category,
      date: body.date,
      read_time: body.readTime,
      image: body.image,
      content: body.content,
      author: body.author,
      meta_title: body.metaTitle,
      meta_description: body.metaDescription,
      keywords: body.keywords,
      is_featured: body.isFeatured ?? false,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase.from('case_studies').update(record).eq('id', body.id).select().single();
    
    if (error) throw error;
    
    // Purge cache to reflect the updated case study immediately
    revalidatePath('/');
    revalidatePath('/case-studies');
    revalidatePath(`/case-studies/${data.slug}`);
    if (body.slug && body.slug !== data.slug) {
      revalidatePath(`/case-studies/${body.slug}`);
    }
    revalidatePath('/case-studies/[slug]', 'page');
    
    return NextResponse.json({ success: true, caseStudy: data });
  } catch (error: any) {
    console.error("API PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    
    // Fetch the slug first to purge its specific page cache
    const { data: study } = await supabase
      .from('case_studies')
      .select('slug')
      .eq('id', id)
      .single();
      
    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    
    if (error) throw error;
    
    // Purge cache to remove the case study immediately
    revalidatePath('/');
    revalidatePath('/case-studies');
    if (study?.slug) {
      revalidatePath(`/case-studies/${study.slug}`);
    }
    revalidatePath('/case-studies/[slug]', 'page');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API DELETE Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to delete case study" }, { status: 500 });
  }
}
