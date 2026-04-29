"use server";

import { v2 as cloudinary } from 'cloudinary';
import { saveSubmission, getAllSubmissions, deleteSubmission, type Submission } from '@/lib/testimonial-store';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

// Configure Cloudinary with the URL from environment variables
// This automatically handles the Cloud Name, API Key, and API Secret.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a file to Cloudinary using the official Node.js SDK (Signed)
 * Returns { success: boolean, url?: string, error?: string }
 */
async function uploadToCloudinary(value: any, folder: string) {
  if (!value || typeof value === 'string' || !(value instanceof Blob) || value.size === 0) {
    return { success: true, url: null };
  }

  try {
    const file = value as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<{ success: boolean; url?: string; error?: string }>((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `testimonials/${folder}`,
          resource_type: "auto", // Works for images, videos, and audio!
        },
        (error, result) => {
          if (error) {
            console.error(`[SDK Debug] Fail (${file.name}):`, error.message);
            resolve({ success: false, error: error.message });
          } else {
            console.log(`[SDK Debug] Success (${file.name}): ${result?.secure_url}`);
            resolve({ success: true, url: result?.secure_url });
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error: any) {
    console.error("[SDK Debug] Exception:", error.message);
    return { success: false, error: error.message || "Network Error" };
  }
}

export async function submitTestimonial(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const companyName = formData.get("companyName") as string;
  const testimonialText = formData.get("testimonial") as string;

  const id = crypto.randomUUID();
  
  // Track individual upload results for frontend feedback
  const uploadStats: Record<string, { success: boolean, error?: string }> = {};

  const handleUpload = async (key: string, fieldName: string) => {
    const file = formData.get(fieldName);
    if (!file || (file instanceof Blob && file.size === 0)) return null;
    
    // Switch to Secure (Signed) SDK Uploads
    const res = await uploadToCloudinary(file, id);
    if (res.success) {
      uploadStats[key] = { success: true };
      return res.url;
    } else {
      uploadStats[key] = { success: false, error: res.error };
      return null;
    }
  };

  try {
    const supabase = await createClient();
    const logoUrl = await handleUpload("Company Logo", "companyLogo");
    const profileUrl = await handleUpload("Profile Photo", "profilePhoto");
    const videoUrl = await handleUpload("Video Testimonial", "video");
    const audioUrl = await handleUpload("Audio Testimonial", "audio");

    // Multiple images
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls = [];
    let imageFailures = 0;
    let lastImageError = "";
    
    for (let i = 0; i < imageFiles.length; i++) {
        const res = await uploadToCloudinary(imageFiles[i], id);
        if (res.success && res.url) {
            imageUrls.push(res.url);
        } else if (imageFiles[i].size > 0) {
            imageFailures++;
            lastImageError = res.error || "Upload failed";
        }
    }
    
    if (imageFailures > 0) {
        uploadStats[`Supporting Images (${imageFailures} failed)`] = { success: false, error: lastImageError };
    } else if (imageFiles.length > 0 && imageFiles[0].size > 0) {
        uploadStats["Supporting Images"] = { success: true };
    }

    await saveSubmission({
      id,
      fullName,
      phone,
      email,
      companyName,
      testimonial: testimonialText,
      submittedAt: new Date().toISOString(),
      attachments: {
        logo: logoUrl || "",
        profile: profileUrl || "",
        video: videoUrl || "",
        audio: audioUrl || "",
        images: imageUrls
      }
    }, supabase);

    revalidatePath('/admin/dashboard');

    return { 
      success: true, 
      uploadStats 
    };
  } catch (error: any) {
    console.error("[Testimonial] Error:", error.message || error);
    return { success: false, error: error.message || "Failed to save submission." };
  }
}

export async function getTestimonials() {
  const supabase = await createClient();
  return await getAllSubmissions(supabase);
}

export async function removeTestimonial(id: string) {
  const supabase = await createClient();
  const success = await deleteSubmission(id, supabase);
  if (success) {
    revalidatePath('/admin/dashboard');
  }
  return { success };
}
