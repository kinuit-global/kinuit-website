import TestimonialSection from "@/Component/Testimonial/Testimonial";
import { getTestimonials } from "@/app/actions/testimonial";

export default async function Testimonials() {
  const allTestimonials = await getTestimonials();
  
  // Filter for those that should be shown on website and map to the UI format
  const visibleTestimonials = allTestimonials
    .filter(t => t.showOnWebsite)
    .map(t => ({
      id: t.id as any,
      name: t.fullName,
      role: `${t.companyName}`,
      image: t.attachments?.profile || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop",
      message: t.testimonial
    }));

  return <TestimonialSection testimonials={visibleTestimonials} />;
}
