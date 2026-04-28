import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { persistData, fetchGitHubData } from "@/lib/github-db";

const RELATIVE_FILE_PATH = "data/case-studies.json";
const caseStudiesFilePath = path.join(process.cwd(), RELATIVE_FILE_PATH);

async function getCaseStudiesData() {
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
  
  if (isVercel && process.env.GITHUB_TOKEN) {
    const data = await fetchGitHubData(RELATIVE_FILE_PATH);
    if (data) return data;
  }

  try {
    if (!fs.existsSync(caseStudiesFilePath)) return [];
    return JSON.parse(fs.readFileSync(caseStudiesFilePath, "utf-8"));
  } catch (error) {
    return [];
  }
}

export async function GET() {
  const caseStudies = await getCaseStudiesData();
  return NextResponse.json(caseStudies);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const caseStudies = await getCaseStudiesData();
    
    const newCaseStudy = {
      ...body,
      id: body.id || uuidv4(),
    };
    
    caseStudies.push(newCaseStudy);
    await persistData(RELATIVE_FILE_PATH, caseStudies);
    
    return NextResponse.json({ success: true, caseStudy: newCaseStudy });
  } catch (error: any) {
    console.error("API POST Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create case study" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const caseStudies = await getCaseStudiesData();
    
    const index = caseStudies.findIndex((b: any) => b.id === body.id);
    if (index === -1) {
       return NextResponse.json({ success: false, error: "Case study not found" }, { status: 404 });
    }
    
    caseStudies[index] = { ...caseStudies[index], ...body };
    await persistData(RELATIVE_FILE_PATH, caseStudies);
    
    return NextResponse.json({ success: true, caseStudy: caseStudies[index] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const caseStudies = await getCaseStudiesData();
    const newCaseStudies = caseStudies.filter((b: any) => b.id !== id);
    await persistData(RELATIVE_FILE_PATH, newCaseStudies);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete case study" }, { status: 500 });
  }
}
