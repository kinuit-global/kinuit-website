"use server";

import { redirect } from "next/navigation";

// Since we may not have the 'resend' package installed yet, 
// we'll handle the email submission logic gracefully.
// The user should run: npm install resend

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const message = formData.get("message") as string;
  const services = formData.get("services") as string;

  console.log("Contact Form Submission:", { name, email, company, message, services });

  // Handle Resend integration dynamically to avoid build errors if package is missing
  try {
    const { Resend } = await import("resend");
    
    // Only proceed if API key is present
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'Kinuit Contact Form <onboarding@resend.dev>',
        to: 'kinuitoffl@gmail.com',
        subject: `New Project Inquiry: ${company}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-top: 4px solid #081FF0; padding: 20px;">
            <h2 style="color: #081FF0; margin-top: 0;">New Project Inquiry</h2>
            <p>You have received a new submission from the Kinuit website contact form.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company/Project:</strong> ${company}</p>
            <p><strong>Services Needed:</strong> ${services}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #eee;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">This email was sent automatically from the Kinuit website.</p>
          </div>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY is missing from .env. Submission logged but email not sent. Redirecting to success page anyway for demo purposes.");
    }
  } catch (error) {
    console.error("Resend service error or package not installed:", error);
    // Even if email fails, we log it and redirect to ensure UX isn't broken
    // In production, you might want to show an error if it's critical
  }

  // Redirect to success page
  redirect("/contact/thanks");
}
