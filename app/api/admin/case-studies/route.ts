import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const caseStudiesFilePath = path.join(process.cwd(), "data", "case-studies.json");

function getCaseStudiesData() {
  try {
    if (!fs.existsSync(caseStudiesFilePath)) return [];
    return JSON.parse(fs.readFileSync(caseStudiesFilePath, "utf-8"));
  } catch (error) {
    return [];
  }
}

function saveCaseStudiesData(data: any) {
  fs.writeFileSync(caseStudiesFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const caseStudies = getCaseStudiesData();
  return NextResponse.json(caseStudies);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const caseStudies = getCaseStudiesData();
    
    const newCaseStudy = {
      ...body,
      id: body.id || uuidv4(),
    };
    
    caseStudies.push(newCaseStudy);
    saveCaseStudiesData(caseStudies);
    
    return NextResponse.json({ success: true, caseStudy: newCaseStudy });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create case study" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const caseStudies = getCaseStudiesData();
    
    const index = caseStudies.findIndex((b: any) => b.id === body.id);
    if (index === -1) {
       return NextResponse.json({ success: false, error: "Case study not found" }, { status: 404 });
    }
    
    caseStudies[index] = { ...caseStudies[index], ...body };
    saveCaseStudiesData(caseStudies);
    
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

    const caseStudies = getCaseStudiesData();
    const newCaseStudies = caseStudies.filter((b: any) => b.id !== id);
    saveCaseStudiesData(newCaseStudies);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete case study" }, { status: 500 });
  }
}
