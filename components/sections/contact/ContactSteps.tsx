import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

export default function ContactSteps() {
  return (
    <Section className="bg-k-bg py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center md:text-left">
          <div className="text-k-text-muted/50 text-xs font-bold tracking-widest uppercase mb-2">WHAT TO EXPECT:</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-k-text uppercase">WHAT HAPPENS NEXT</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-k-card-bg border border-k-border rounded-2xl relative overflow-hidden group shadow-sm">
            <div className="absolute inset-0 bg-k-primary/0 group-hover:bg-k-primary/5 transition-colors" />
            <div className="text-k-primary font-black text-sm tracking-widest uppercase mb-4 relative z-10">STEP 01</div>
            <h3 className="text-xl font-bold mb-3 text-k-text relative z-10">You tell us your story</h3>
            <p className="text-k-text-muted text-base relative z-10 leading-relaxed">
              What you are building, what you need, and where you want to go.
            </p>
          </div>
          
          <div className="p-8 bg-k-card-bg border border-k-border rounded-2xl relative overflow-hidden group shadow-sm">
            <div className="absolute inset-0 bg-k-primary/0 group-hover:bg-k-primary/5 transition-colors" />
            <div className="text-k-primary font-black text-sm tracking-widest uppercase mb-4 relative z-10">STEP 02</div>
            <h3 className="text-xl font-bold mb-3 text-k-text relative z-10">We review and respond</h3>
            <p className="text-k-text-muted text-base relative z-10 leading-relaxed">
              We come back with a clear point of view on how we would approach your project.
            </p>
          </div>
          
          <div className="p-8 bg-k-card-bg border border-k-border rounded-2xl relative overflow-hidden group shadow-sm">
            <div className="absolute inset-0 bg-k-primary/0 group-hover:bg-k-primary/5 transition-colors" />
            <div className="text-k-primary font-black text-sm tracking-widest uppercase mb-4 relative z-10">STEP 03</div>
            <h3 className="text-xl font-bold mb-3 text-k-text relative z-10">We map the path forward</h3>
            <p className="text-k-text-muted text-base relative z-10 leading-relaxed">
              If we are the right fit, we outline the plan. If not, we will be honest about that too.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-k-text-muted font-medium text-lg">We respond to every message within 24 hours.</p>
        </div>
      </Container>
    </Section>
  );
}
