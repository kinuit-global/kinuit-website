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

const PRIMARY_MODEL = "gemini-3.1-flash-lite";
const FALLBACK_MODEL = "gemini-2.5-flash";
const TERTIARY_MODEL = "gemini-2.5-flash-lite";

const GENERATION_CONFIG = {
  maxOutputTokens: 10240, // Sufficient for long-form case study rewrites
  temperature: 0.7,
  topP: 0.95,
};

async function generateWithRetry(modelName: string, prompt: string, maxRetries = 3) {
  const genAI = getGenAIClient();
  const model = genAI.getGenerativeModel(
    { model: modelName }
  );

  const originalFetch = globalThis.fetch;
  const nextOriginalFetch = (globalThis as any)[Symbol.for('Next.js.originalFetch')];
  if (nextOriginalFetch) {
    globalThis.fetch = nextOriginalFetch;
  }

  try {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: GENERATION_CONFIG,
        });

        // Basic structure validation
        if (!result.response || !result.response.candidates || result.response.candidates.length === 0) {
          throw new Error("EMPTY_RESPONSE");
        }

        return result.response.text().trim();
      } catch (error: any) {
        if (attempt < maxRetries - 1) {
          const delay = (attempt + 1) * 1000 + Math.random() * 300;
          console.warn(`Gemini Admin Attempt ${attempt + 1} failed (${error.message}). Retrying in ${delay}ms...`);
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

    const { targetText, intent, fullContent } = await req.json();

    if (!targetText && intent !== "seo") {
      return NextResponse.json({ success: false, error: "Missing required content." }, { status: 400 });
    }

    let prompt = "";
    const brandContext = "working for 'Kinuit', a premium Web3 and Digital Agency. Rewrite to sound strategic, high-ticket, and professional.";

    switch (intent) {
      case "rewrite":
        prompt = `You are a world-class copywriter ${brandContext}
        Maintain HTML tags exactly. Return ONLY the rewritten text.
        
        Text: ${targetText}`;
        break;

      case "correct":
        prompt = `Expert Editor: Correct grammar/spelling in the following. Keep HTML intact. Return ONLY corrected text.
        
        Text: ${targetText}`;
        break;

      case "seo":
        prompt = `Analyze this case study for SEO metadata for Kinuit. 
        Return ONLY valid JSON: {"metaTitle": "...", "metaDescription": "...", "keywords": "..."}
        
        Content: ${fullContent}`;
        break;

      default:
        return NextResponse.json({ success: false, error: "Invalid intent" }, { status: 400 });
    }

    let result;
    try {
      // First attempt with PRIMARY_MODEL
      result = await generateWithRetry(PRIMARY_MODEL, prompt);
    } catch (primaryError: any) {
      console.error(`Primary Model (${PRIMARY_MODEL}) failed:`, primaryError.message);

      // FALLBACK logic: Switch to lite model if primary hits quota or fails
      try {
        console.info(`Switching to Fallback Model: ${FALLBACK_MODEL}`);
        result = await generateWithRetry(FALLBACK_MODEL, prompt, 2);
      } catch (fallbackError: any) {
        console.error(`Fallback Model (${FALLBACK_MODEL}) failed:`, fallbackError.message);
        try {
          console.info(`Switching to Tertiary Model: ${TERTIARY_MODEL}`);
          result = await generateWithRetry(TERTIARY_MODEL, prompt, 2);
        } catch (tertiaryError: any) {
          throw new Error(`AI System Overloaded: All model variants are currently unavailable.`);
        }
      }
    }

    if (!result) {
      throw new Error("AI system failed to return a response.");
    }

    const responseText = result;

    if (intent === "seo") {
      const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      try {
        return NextResponse.json({ success: true, seo: JSON.parse(cleaned) });
      } catch {
        return NextResponse.json({ success: false, error: "AI generated invalid JSON metadata." }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, result: responseText });
  } catch (error: any) {
    console.error("AI Route Error:", error);

    // Improved error responses for Quota/Token issues
    if (error.message?.includes("max tokens")) {
      return NextResponse.json({
        success: false,
        error: "Content too large to process. Please try a smaller selection."
      }, { status: 413 });
    }

    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return NextResponse.json({
        success: false,
        error: "AI Quota Exceeded. Please retry in 60 seconds."
      }, { status: 429 });
    }

    return NextResponse.json({ success: false, error: error.message || "Failed to process request." }, { status: 500 });
  }
}
