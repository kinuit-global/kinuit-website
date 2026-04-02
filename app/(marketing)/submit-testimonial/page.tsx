import { Metadata } from 'next';
import TestimonialForm from '@/Component/Testimonial/TestimonialForm';

export const metadata: Metadata = {
  title: 'Submit Your Testimonial | Kinuit',
  description: 'Share your experience working with Kinuit.',
};

export default function TestimonialPage() {
  return (
    <main className="min-h-screen bg-k-bg selection:bg-k-primary selection:text-white pt-32 md:pt-40">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-k-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-k-primary/5 blur-[120px] rounded-full" />
      </div>

      <TestimonialForm />
    </main>
  );
}
