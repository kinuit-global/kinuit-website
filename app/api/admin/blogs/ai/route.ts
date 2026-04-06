import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "GEMINI_API_KEY is not defined in environment variables." },
        { status: 500 }
      );
    }

    const { targetText, intent, fullContent } = await req.json();

    if (!targetText && intent !== "seo") {
      return NextResponse.json({ success: false, error: "Missing target text" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";

    switch (intent) {
      case "rewrite":
        prompt = `You are a world-class professional copywriter working for 'Kinuit', a premium Web3 and Digital Agency. 
        Rewrite the following text to sound extremely professional, high-ticket, engaging, and strategic. 
        Keep the HTML formatting perfectly intact if any exists, and return ONLY the rewritten text with no extra conversational remarks.
        
        Text to rewrite:
        ${targetText}`;
        break;
      
      case "correct":
        prompt = `You are an expert editor. Correct any grammar, spelling, or punctuation errors in the following text. 
        Keep the HTML formatting perfectly intact if any exists. 
        Return ONLY the corrected text, with no conversational remarks.
        
        Text to correct:
        ${targetText}`;
        break;
        
      case "seo":
        prompt = `Analyze the following blog post content and generate optimal SEO metadata tailored for high rankings. 
        Return ONLY a JSON object exactly matching this format: {"metaTitle": "string", "metaDescription": "string", "keywords": "string"}
        Do not wrap the response in markdown blocks or 'json' tags, just pure JSON.
        
        Content:
        ${fullContent}`;
        break;
        
      default:
        return NextResponse.json({ success: false, error: "Invalid intent" }, { status: 400 });
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // If intent is seo, parse JSON
    if (intent === "seo") {
      let cleaned = responseText;
      // Remove any markdown code blocks
      cleaned = cleaned.replace(/```json/g, "").replace(/```/g, "").trim();
      
      try {
        return NextResponse.json({ success: true, seo: JSON.parse(cleaned) });
      } catch (parseError) {
         console.error("JSON Parse Error:", responseText);
         return NextResponse.json({ 
           success: false, 
           error: "AI returned invalid JSON format. Please try again." 
         }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, result: responseText });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to process AI request" }, { status: 500 });
  }
}
