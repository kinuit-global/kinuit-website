import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");

function getBlogsData() {
  try {
    if (!fs.existsSync(blogsFilePath)) return [];
    return JSON.parse(fs.readFileSync(blogsFilePath, "utf-8"));
  } catch (error) {
    return [];
  }
}

function saveBlogsData(data: any) {
  fs.writeFileSync(blogsFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const blogs = getBlogsData();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const blogs = getBlogsData();
    
    const newBlog = {
      ...body,
      id: body.id || uuidv4(),
    };
    
    blogs.push(newBlog);
    saveBlogsData(blogs);
    
    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const blogs = getBlogsData();
    
    const index = blogs.findIndex((b: any) => b.id === body.id);
    if (index === -1) {
       return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }
    
    blogs[index] = { ...blogs[index], ...body };
    saveBlogsData(blogs);
    
    return NextResponse.json({ success: true, blog: blogs[index] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const blogs = getBlogsData();
    const newBlogs = blogs.filter((b: any) => b.id !== id);
    saveBlogsData(newBlogs);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 });
  }
}
