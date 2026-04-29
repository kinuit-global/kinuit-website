import { supabasePublic } from '@/lib/supabase/public';

export interface Submission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  companyName: string;
  testimonial: string;
  submittedAt: string;
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
    attachments: submission.attachments,
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
