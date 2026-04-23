import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Production Models for 2026 (Reflecting free-tier changes)
const PRIMARY_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.5-flash-lite";

const GENERATION_CONFIG = {
  maxOutputTokens: 10240, // Sufficient for long-form case study rewrites
  temperature: 0.7,
  topP: 0.95,
};

/**
 * Executes a generative AI request with exponential backoff and automatic retry on 429/503.
 */
async function generateWithRetry(modelName: string, prompt: string, maxRetries = 3) {
  const model = genAI.getGenerativeModel(
    { model: modelName },
    { apiVersion: "v1" }
  );

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

      return result;
    } catch (error: any) {
      const isQuotaError = error.message?.includes("429") || error.message?.includes("quota");
      const isServiceError = error.message?.includes("503") || error.message?.includes("overloaded");
      
      // If it's a retryable error and not the last attempt
      if ((isQuotaError || isServiceError) && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt + 1) * 1000 + Math.random() * 500;
        console.warn(`Gemini Attempt ${attempt + 1} failed (${error.message}). Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
}

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "GEMINI_API_KEY is missing." },
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
        throw new Error(`AI System Overloaded: Both ${PRIMARY_MODEL} and ${FALLBACK_MODEL} are currently unavailable.`);
      }
    }

    if (!result) {
      throw new Error("AI system failed to return a response.");
    }
    
    const responseText = result.response.text().trim();

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
    
    // Improved error responses for 2026 Quota/Token issues
    if (error.message?.includes("max tokens")) {
      return NextResponse.json({ 
        success: false, 
        error: "Content too large to process. Please try a smaller selection." 
      }, { status: 413 });
    }

    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return NextResponse.json({ 
        success: false, 
        error: "AI Quota Exceeded. Our systems are currently at free-tier capacity. Please retry in 60 seconds." 
      }, { status: 429 });
    }

    return NextResponse.json({ success: false, error: error.message || "Failed to process request." }, { status: 500 });
  }
}
