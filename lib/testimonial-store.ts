import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'testimonials.json');

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

export async function getAllSubmissions(): Promise<Submission[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.submissions || [];
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

export async function saveSubmission(submission: Submission): Promise<void> {
  const data = await fs.readFile(DATA_PATH, 'utf-8');
  const parsed = JSON.parse(data);
  if (!parsed.submissions) parsed.submissions = [];
  parsed.submissions.push(submission);
  await fs.writeFile(DATA_PATH, JSON.stringify(parsed, null, 2));
}

export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    const index = parsed.submissions.findIndex((s: Submission) => s.id === id);
    if (index !== -1) {
      parsed.submissions.splice(index, 1);
      await fs.writeFile(DATA_PATH, JSON.stringify(parsed, null, 2));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting submission:', error);
    return false;
  }
}

