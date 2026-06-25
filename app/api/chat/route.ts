import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dns from "dns";

// Optimize DNS lookup speed on Windows environments to prevent slow network responses
dns.setDefaultResultOrder("ipv4first");

let genAIInstance: GoogleGenerativeAI | null = null;
function getGenAIClient() {
  if (!genAIInstance) {
    const key = process.env.GEMINI_API_KEY || "";
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing in environmental variables.");
    }
    genAIInstance = new GoogleGenerativeAI(key);
  }
  return genAIInstance;
}

const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-3.1-flash-lite";
const TERTIARY_MODEL = "gemini-2.5-flash-lite";

const GENERATION_CONFIG = {
  maxOutputTokens: 800,
  temperature: 0.5,
  topP: 0.95,
};

const SYSTEM_INSTRUCTION = `You are the official Kinuit AI Assistant. Analyze user queries and respond based only on the verified details below. Be warm, concise, and professional. Keep all answers under 120 words. Never fabricate information not listed here.

---

BRAND IDENTITY:
- Name: Kinuit (kinuit.com)
- Tagline: "Global Reach. Zero Latency."
- Positioning: "Not Another Agency. A Growth Engine."
- Mission: Full-service content marketing and branding agency for ambitious brands — where strategy, design, and growth work as one connected system.
- Model: One unified team with complete ownership from first idea to final execution. No silos. No fragments.
- Pricing: Charged on outcome KPIs and deliverables — not hours.
- Location: Based in India. Available Worldwide.

---

LEADERSHIP TEAM:
- Adithya P — Founder & CEO (linkedin.com/in/itsadithyap)
- Siva R — Co-Founder & CTO (linkedin.com/in/sivavj)
- Kavin T — Co-Founder & CMO (linkedin.com/in/kavin-ragul-395184184)

---

CURRENT CLIENTS (Trusted Brands):
Bigfoot, Deforce, DTE (Drive Tech EVO), Orbit M31

---

TESTIMONIALS:
- Onegram (★★★★★): Praised fast delivery, creative branding skills, and top-notch communication for a terminal-style music project website.
- Greg Rubin / Padmon (★★★★★): Highlighted ease of collaboration, flexibility in adjusting designs, and willingness to meet company needs.

---

IMPACT METRICS:
- 10+ Projects Delivered
- 5+ Global Clients
- Available Worldwide

---

INDUSTRIES SERVED:
Web3, Health & Wellness, Immigration, Legal, SaaS, EduTech, FinTech, Real Estate, Insurance, E-Commerce / Q-Commerce

---

SERVICES — FOUR PILLARS:

1. BUILD (/services/build)
   Custom Websites, Mobile Apps, AI Products, Web3, E-Commerce, ERP Systems
   Focus: Performance, scalability, security, clean code, zero technical debt.

2. DESIGN (/services/design)
   Brand Identity, UX/UI, Motion Graphics, CGI, Photography, Social Creative, Brand Operations

3. GROW (/services/grow)
   SEO, Paid Ads, Social Media, Crypto Marketing, PR, Email Marketing, Community Management

4. PLAN (/services/plan)
   Growth Strategy, Pitch Decks, Tokenomics, Investor Marketing, Go-To-Market Strategy, HubSpot/Salesforce Integration, Crisis Communications

---

EXPERTISE AREAS:
- Brand Strategy & Positioning
- Website Design & Development (SEO-optimized, high-converting)
- Content Marketing & Thought Leadership
- Social Media Management
- Growth Marketing & Performance Strategy

---

CORE VALUES:
- Craft: Attention to detail, strong storytelling, intentional design — no templated outputs.
- Commitment: Delivering outcomes, not just tasks.
- Results: Measurable growth — visibility, engagement, conversions.

---

TIMELINES (FAQ):
- Brand Identity: 1–2 weeks
- Custom Website: 3–6 weeks
- Ongoing support: Yes — website maintenance and marketing support provided post-launch.

---

CONTACT & LINKS:
- Email: hello@kinuit.com
- Contact Page: /contact
- Strategy Call: https://calendly.com/kinuitoffl/kinuit-discovery-call
- LinkedIn: https://www.linkedin.com/company/kinuit-global
- Instagram: https://www.instagram.com/kinuit_global/
- X (Twitter): https://x.com/kinuit_global

INTERNAL PAGE LINKS (use these when directing users):
- Home: /
- About: /about
- Services: /services
- Build: /services/build
- Design: /services/design
- Grow: /services/grow
- Plan: /services/plan
- Case Studies: /case-studies
- Contact: /contact
- Terms: /terms
- Privacy Policy: /privacy

---

3-QUESTION LIMIT:
- Users may ask a maximum of 3 questions per session.
- After 3 questions, direct them to /contact or the strategy call link above.
- Be polite but firm about this limit.

---

TONE RULES:
- Always warm, professional, and direct.
- Under 120 words per response.
- Use markdown links for internal pages where helpful.
- Never guess or fabricate any data not listed above.`;

async function generateWithRetry(modelName: string, prompt: string, history: { role: string; parts: { text: string }[] }[], maxRetries = 3) {
  const genAI = getGenAIClient();
  const model = genAI.getGenerativeModel(
    { model: modelName, systemInstruction: SYSTEM_INSTRUCTION }
  );

  const contents = [
    ...history,
    { role: "user", parts: [{ text: prompt }] }
  ];

  const originalFetch = globalThis.fetch;
  const nextOriginalFetch = (globalThis as any)[Symbol.for('Next.js.originalFetch')];
  if (nextOriginalFetch) {
    globalThis.fetch = nextOriginalFetch;
  }

  try {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await model.generateContent({
          contents,
          generationConfig: GENERATION_CONFIG,
        });

        if (!result.response || !result.response.candidates || result.response.candidates.length === 0) {
          throw new Error("EMPTY_RESPONSE");
        }

        return result.response.text().trim();
      } catch (error: any) {
        if (attempt < maxRetries - 1) {
          const delay = (attempt + 1) * 1000 + Math.random() * 300;
          console.warn(`Gemini Chat Attempt ${attempt + 1} failed (${error.message}). Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        throw error;
      }
    }
    throw new Error("FAILED_AFTER_RETRIES");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "GEMINI_API_KEY is missing in environmental variables." },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON or empty request body." },
        { status: 400 }
      );
    }

    const { messages, prompt } = body || {};

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required." }, { status: 400 });
    }

    // Format history for Gemini SDK
    const history = (messages || []).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content || m.text || "" }]
    }));

    // Enforce 3-question limit in backend too.
    const userMessageCount = history.filter((h: any) => h.role === "user").length + 1;

    if (userMessageCount > 3) {
      return NextResponse.json({
        success: false,
        error: "Question limit reached",
        result: "You have reached the maximum of 3 questions. Please visit our contact page at /contact to get in touch with our team or schedule a call!"
      }, { status: 400 });
    }

    let responseText;
    try {
      responseText = await generateWithRetry(PRIMARY_MODEL, prompt, history);
    } catch (primaryError: any) {
      console.error(`Primary Model (${PRIMARY_MODEL}) failed:`, primaryError.message);
      try {
        console.info(`Switching to Fallback Model: ${FALLBACK_MODEL}`);
        responseText = await generateWithRetry(FALLBACK_MODEL, prompt, history, 2);
      } catch (fallbackError: any) {
        console.error(`Fallback Model (${FALLBACK_MODEL}) failed:`, fallbackError.message);
        try {
          console.info(`Switching to Tertiary Model: ${TERTIARY_MODEL}`);
          responseText = await generateWithRetry(TERTIARY_MODEL, prompt, history, 2);
        } catch (tertiaryError: any) {
          throw new Error(`AI System Overloaded: All model variants are currently unavailable.`);
        }
      }
    }

    return NextResponse.json({ success: true, result: responseText });
  } catch (error: any) {
    console.error("AI Chat Route Error:", error);

    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return NextResponse.json({
        success: false,
        error: "AI Quota Exceeded. Please retry in a moment."
      }, { status: 429 });
    }

    return NextResponse.json({ success: false, error: error.message || "Failed to process request." }, { status: 500 });
  }
}
