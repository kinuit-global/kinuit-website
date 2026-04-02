import { Metadata } from 'next';
import { validateToken } from '@/lib/testimonial-store';
import TestimonialForm from '@/Component/Testimonial/TestimonialForm';
import { notFound } from 'next/navigation';
import { ShieldAlert, Link as LinkIcon, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Submit Your Testimonial | Kinuit',
  description: 'Private link for testimonial collection.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function TestimonialPage({ params }: PageProps) {
  const { token } = await params;

  // Simple numeric check if needed, but validateToken handles existence
  const { valid, used } = await validateToken(token);

  if (!valid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-k-bg">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
          <ShieldAlert className="text-red-500 w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-k-text mb-2 uppercase tracking-tight">Invalid Link</h1>
        <p className="text-k-text-muted max-w-sm">
          This testimonial collection link is invalid or has expired. Please contact our team if you believe this is an error.
        </p>
      </div>
    );
  }

  if (used) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-k-bg">
        <div className="w-16 h-16 bg-k-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-k-primary/20">
          <Clock className="text-k-primary w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-k-text mb-2 uppercase tracking-tight">Link Already Used</h1>
        <p className="text-k-text-muted max-w-sm">
          A testimonial has already been submitted using this link. Thank you for your contribution!
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-k-bg selection:bg-k-primary selection:text-white">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-k-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-k-primary/5 blur-[120px] rounded-full" />
      </div>

      <TestimonialForm token={token} />
    </main>
  );
}
