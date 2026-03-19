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
          <div style="font-family: 'Inter', sans-serif; background-color: #f4f7f9; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <div style="background-color: #050D1A; padding: 40px 30px; text-align: center; border-bottom: 4px solid #081FF0;">
                <img src="${process.env.NEXT_PUBLIC_BASE_URL || 'https://kinuit.com'}/logo.svg" alt="Kinuit Logo" style="height: 40px; margin-bottom: 24px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; text-transform: uppercase;">New Project Inquiry</h1>
                <p style="color: #ffffff70; margin: 8px 0 0; font-size: 14px; font-weight: 500;">Kinuit Global – Website Lead</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px;">
                <p style="font-size: 16px; color: #4b5563; margin-top: 0; margin-bottom: 24px;">You have received a new inquiry from the <strong>Kinuit</strong> contact form. Here are the details:</p>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 600; width: 35%;">Client Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 16px; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 600;">Email Address</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #081FF0; font-size: 16px; font-weight: 500;"><a href="mailto:${email}" style="color: #081FF0; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 600;">Company/Project</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 16px; font-weight: 500;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 600;">Expertise Needed</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 16px; font-weight: 500;">${services || 'Not specified'}</td>
                  </tr>
                </table>
                
                <div style="margin-top: 32px; background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #f3f4f6;">
                  <h4 style="color: #6b7280; margin-top: 0; margin-bottom: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Project Brief</h4>
                  <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                
                <!-- Action Button (Optional) -->
                <div style="margin-top: 40px; text-align: center;">
                  <a href="mailto:${email}" style="display: inline-block; background-color: #081FF0; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Reply to Client</a>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="padding: 20px 40px 30px; text-align: center; border-top: 1px solid #f3f4f6;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">This inquiry was captured automatically by Kinuit's direct lead system.</p>
                <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0;">&copy; ${new Date().getFullYear()} Kinuit Global. All rights reserved.</p>
              </div>
            </div>
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
