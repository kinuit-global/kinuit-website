import { supabasePublic } from '@/lib/supabase/public';

export interface Submission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  companyName: string;
  testimonial: string;
  submittedAt: string;
  showOnWebsite?: boolean;
  attachments?: {
    logo?: string | null;
    profile?: string | null;
    video?: string | null;
    audio?: string | null;
    images?: string[];
  };
}

export async function getAllSubmissions(supabaseClient = supabasePublic): Promise<Submission[]> {
  const { data, error } = await supabaseClient
    .from('testimonials')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials from Supabase:', JSON.stringify(error, null, 2));
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    fullName: item.full_name,
    phone: item.phone,
    email: item.email,
    companyName: item.company_name,
    testimonial: item.testimonial,
    submittedAt: item.submitted_at,
    showOnWebsite: !!item.attachments?.show_on_website,
    attachments: item.attachments,
  })) as Submission[];
}

export async function saveSubmission(submission: Submission, supabaseClient = supabasePublic): Promise<void> {
  const record = {
    id: submission.id,
    full_name: submission.fullName,
    phone: submission.phone,
    email: submission.email,
    company_name: submission.companyName,
    testimonial: submission.testimonial,
    submitted_at: submission.submittedAt,
    attachments: {
      ...submission.attachments,
      show_on_website: submission.showOnWebsite
    },
  };

  const { error } = await supabaseClient.from('testimonials').insert([record]);
  if (error) {
    console.error('Error saving testimonial:', JSON.stringify(error, null, 2));
    throw new Error(error.message || 'Failed to save testimonial to database');
  }
}

export async function deleteSubmission(id: string, supabaseClient = supabasePublic): Promise<boolean> {
  const { error } = await supabaseClient.from('testimonials').delete().eq('id', id);
  if (error) {
    console.error('Error deleting testimonial:', JSON.stringify(error, null, 2));
    return false;
  }
  return true;
}

export async function updateTestimonialVisibility(id: string, showOnWebsite: boolean, supabaseClient = supabasePublic): Promise<boolean> {
  // Get existing attachments
  const { data } = await supabaseClient.from('testimonials').select('attachments').eq('id', id).single();
  const currentAttachments = data?.attachments || {};

  const { error } = await supabaseClient
    .from('testimonials')
    .update({ 
      attachments: {
        ...currentAttachments,
        show_on_website: showOnWebsite
      }
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating testimonial visibility:', JSON.stringify(error, null, 2));
    return false;
  }
  return true;
}

export async function updateSubmission(id: string, submission: Partial<Submission>, supabaseClient = supabasePublic): Promise<void> {
  // First get existing attachments if we are updating attachments or showOnWebsite
  let currentAttachments = {};
  if (submission.showOnWebsite !== undefined || submission.attachments !== undefined) {
    const { data } = await supabaseClient.from('testimonials').select('attachments').eq('id', id).single();
    currentAttachments = data?.attachments || {};
  }

  const record: any = {};
  if (submission.fullName !== undefined) record.full_name = submission.fullName;
  if (submission.phone !== undefined) record.phone = submission.phone;
  if (submission.email !== undefined) record.email = submission.email;
  if (submission.companyName !== undefined) record.company_name = submission.companyName;
  if (submission.testimonial !== undefined) record.testimonial = submission.testimonial;
  
  if (submission.showOnWebsite !== undefined || submission.attachments !== undefined) {
    const newAttachments = submission.attachments || {};
    record.attachments = {
      ...currentAttachments,
      ...newAttachments,
      show_on_website: submission.showOnWebsite !== undefined ? submission.showOnWebsite : (currentAttachments as any).show_on_website
    };
  }

  const { error } = await supabaseClient
    .from('testimonials')
    .update(record)
    .eq('id', id);

  if (error) {
    console.error('Error updating testimonial:', JSON.stringify(error, null, 2));
    throw new Error(error.message || 'Failed to update testimonial in database');
  }
}
