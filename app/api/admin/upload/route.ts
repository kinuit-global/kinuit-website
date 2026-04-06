import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with the official SDK and Signed uploads
// This eliminates the "Preset not found" issue by using your API Key/Secret.
cloudinary.config({
  cloudinary_api_url: process.env.CLOUDINARY_URL,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    // Convert to Buffer for the SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Perform a Secure (Signed) upload via the official SDK
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "blogs",
          resource_type: "auto", // Handles all file types automatically
        },
        (error, result) => {
          if (error) {
            console.error("[SDK API] Upload Error:", error.message);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    // Return the secure, persistent Cloudinary URL
    // v: "sdk-signed-v1" helps us verify that the new SDK logic is running.
    return NextResponse.json({ 
      success: true, 
      url: result.secure_url, 
      v: "sdk-signed-v1" 
    });
  } catch (error: any) {
    console.error("[SDK API] Critical Error:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "An unexpected error occurred during upload." 
    }, { status: 500 });
  }
}
