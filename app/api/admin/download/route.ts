import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  let filename = searchParams.get("filename") || "download";

  if (!fileUrl) {
    return new NextResponse("Missing file URL", { status: 400 });
  }

  try {
    // SECURITY: Only allow downloads from the uploads directory
    if (!fileUrl.startsWith("/uploads/")) {
        return new NextResponse("Forbidden", { status: 403 });
    }

    // Resolve local path
    const filePath = path.join(process.cwd(), "public", fileUrl);
    
    // Check if file exists
    try {
        await fs.access(filePath);
    } catch {
        return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    
    // Determine content type based on extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";
    
    const mimeTypes: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".mp4": "video/mp4",
        ".mov": "video/quicktime",
        ".webm": "video/webm",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".m4a": "audio/x-m4a",
    };

    if (mimeTypes[ext]) {
        contentType = mimeTypes[ext];
    }

    // Sanitize filename
    if (!path.extname(filename)) {
        filename += ext;
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
