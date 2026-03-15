import Hero from '@/Component/Hero/Hero'
import Services from '@/Component/Services/Service'
import Story from '@/Component/Story/Story'
import WhyKinuit from '@/Component/Why/Why'
import Clients from '@/Component/Client/Client'
import FAQ from '@/Component/FAQ/FAQ'
import OurApproach from '@/Component/Approach/Approach'
import CaseStudies from '@/Component/Casestudy/Casestudy'
import Testimonials from '@/Component/Testimonial/Testimonial'
import CTASection from '@/Component/globalCompo/CTA'

const page = () => {
  return (
    <main>
         <Hero/>
         <Services/>
         <Story/>
         <WhyKinuit/>
          <OurApproach/>
         <CaseStudies/>
         <Clients/>
         <Testimonials/>
         <FAQ/>
         <CTASection/>
    </main>
  )
}

export default page