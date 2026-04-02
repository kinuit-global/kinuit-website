"use server";

import fs from 'fs/promises';
import path from 'path';
import { saveSubmission, getAllSubmissions, deleteSubmission, type Submission } from '@/lib/testimonial-store';
import { revalidatePath } from 'next/cache';

export async function submitTestimonial(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const companyName = formData.get("companyName") as string;
  const testimonialText = formData.get("testimonial") as string;

  const id = crypto.randomUUID();

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'testimonials', id);
    await fs.mkdir(uploadDir, { recursive: true });

    const saveFile = async (value: any, category: string) => {
      //formData.get returns string if empty or no file selected in some environments
      if (!value || typeof value === 'string' || !(value instanceof Blob) || value.size === 0) {
        return null;
      }
      
      const file = value as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${category}_${Date.now()}_${safeName}`;
      const filePath = path.join(uploadDir, fileName);
      
      await fs.writeFile(filePath, buffer);
      return `/uploads/testimonials/${id}/${fileName}`;
    };

    // Single file uploads
    const logoUrl = await saveFile(formData.get("companyLogo") as File, "logo");
    const profileUrl = await saveFile(formData.get("profilePhoto") as File, "profile");
    const videoUrl = await saveFile(formData.get("video") as File, "video");
    const audioUrl = await saveFile(formData.get("audio") as File, "audio");

    // Multiple images
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls = [];
    for (let i = 0; i < imageFiles.length; i++) {
        const url = await saveFile(imageFiles[i], `image_${i}`);
        if (url) imageUrls.push(url);
    }

    // Save metadata
    await saveSubmission({
      id,
      fullName,
      phone,
      email,
      companyName,
      testimonial: testimonialText,
      submittedAt: new Date().toISOString(),
      attachments: {
        logo: logoUrl,
        profile: profileUrl,
        video: videoUrl,
        audio: audioUrl,
        images: imageUrls
      }
    });

    revalidatePath('/admin/dashboard');

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "Failed to process submission. Please try again." };
  }
}

export async function getTestimonials() {
  return await getAllSubmissions();
}

export async function removeTestimonial(id: string) {
  const success = await deleteSubmission(id);
  if (success) {
    // Optionally remove folder in public/uploads but let's keep it simple for now or perform cleanup
    try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'testimonials', id);
        await fs.rm(uploadDir, { recursive: true, force: true });
    } catch (e) {
        console.error("Failed to delete attachments directory:", e);
    }
    revalidatePath('/admin/dashboard');
  }
  return { success };
}
