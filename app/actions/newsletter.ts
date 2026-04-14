"use server";

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  console.log("Newsletter Subscription:", { email });

  try {
    const { Resend } = await import("resend");

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // 1. Send notification to internal team
      const notifyRes = await resend.emails.send({
        from: 'Kinuit Newsletter <hello@kinuit.com>',
        to: process.env.EMAIL_TO || 'hello@kinuit.com',
        replyTo: email,
        subject: `New Newsletter Subscriber: ${email}`,
        html: `
          <div style="font-family: 'Inter', sans-serif; background-color: #f4f7f9; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              <!-- Header -->
              <div style="background-color: #050D1A; padding: 40px 30px; text-align: center; border-bottom: 4px solid #081FF0;">
                <img src="${process.env.NEXT_PUBLIC_BASE_URL || 'https://kinuit.com'}/logo.svg" alt="Kinuit Logo" style="height: 40px; margin-bottom: 24px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; text-transform: uppercase;">New Subscriber</h1>
                <p style="color: #ffffff70; margin: 8px 0 0; font-size: 14px; font-weight: 500;">Kinuit Global – Newsletter</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px; text-align: center;">
                <div style="background-color: #f3f8ff; border: 1px solid #dce8fc; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
                  <p style="font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-top: 0; margin-bottom: 12px; letter-spacing: 0.05em;">New Email Added</p>
                  <p style="font-size: 20px; font-weight: 700; color: #081FF0; margin: 0;">${email}</p>
                </div>
                <p style="font-size: 14px; color: #6b7280; margin: 0;">This email has successfully joined the Inner Circle mailing list.</p>
              </div>
            </div>
          </div>
        `,
      });
      
      if (notifyRes.error) {
        console.error("Failed to send admin notification:", notifyRes.error);
      }

      // 2. Send welcome email to the subscriber
      const welcomeRes = await resend.emails.send({
        from: 'Kinuit Global <hello@kinuit.com>',
        to: email,
        replyTo: 'hello@kinuit.com',
        subject: 'Welcome to the Kinuit Inner Circle',
        text: `Welcome to the Kinuit Inner Circle!\n\nThank you for joining our newsletter. You've just gained a front-row seat to the engine room of high-performance branding and digital strategy.\n\nEvery month, we'll drop deep dives into how we're building the next generation of ambitious brands—minus the fluff.\n\nCheck out our work: https://kinuit.com/work\n\nTo make sure you get our next update, please reply to this email with "Got it!" or add hello@kinuit.com to your contacts.`,
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: 'Inter', sans-serif; background-color: #050a14; margin: 0; padding: 40px 20px;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #0a1122; border: 1px solid #1a2542; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                <div style="padding: 50px 40px; text-align: center; border-bottom: 1px solid #1a2542; background: linear-gradient(180deg, #0f172a 0%, #0a1122 100%);">
                  <img src="${process.env.NEXT_PUBLIC_BASE_URL || 'https://kinuit.com'}/logo.svg" alt="Kinuit Logo" style="height: 36px; margin-bottom: 30px;">
                  <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -0.04em; margin: 0; text-transform: uppercase; color: #ffffff;">Welcome <span style="color: #3b82f6; font-style: italic;">In</span>.</h1>
                </div>
                <div style="padding: 40px; text-align: center;">
                  <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1; margin-top: 0; margin-bottom: 24px;">Thank you for joining our newsletter. You've just gained a front-row seat to the engine room of high-performance branding and digital strategy.</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1; margin-bottom: 32px;">Every month, we'll drop deep dives into how we're building the next generation of ambitious brands—minus the fluff.</p>
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://kinuit.com'}/work" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 18px 36px; border-radius: 12px; font-weight: 800; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s ease;">Explore Our Work</a>
                </div>
                <div style="padding: 30px 40px; text-align: center; border-top: 1px solid #1a2542; background-color: #050a14;">
                  <div style="margin-bottom: 16px;">
                    <a href="https://linkedin.com/company/kinuit-global" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">LinkedIn</a>
                    <a href="https://instagram.com/kinuit_global" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Instagram</a>
                    <a href="https://x.com/kinuit_global" style="color: #64748b; text-decoration: none; font-size: 12px; margin: 0 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Twitter</a>
                  </div>
                  <p style="font-size: 10px; color: #475569; margin: 0;">© ${new Date().getFullYear()} KINUIT GLOBAL. ALL RIGHTS RESERVED.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (welcomeRes.error) {
        console.error("Subscriber Welcome Email Failed:", welcomeRes.error);
        return { success: false, error: welcomeRes.error.message || "Failed to send welcome email." };
      }

    } else {
      console.warn("RESEND_API_KEY is missing. Subscription logged but email not sent.");
    }
  } catch (error: any) {
    console.error("Resend service error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }

  return { success: true };
}
