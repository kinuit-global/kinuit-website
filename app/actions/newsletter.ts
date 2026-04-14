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
          <div style="font-family: 'Inter', sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 16px;">
            <h1 style="color: #3b82f6; font-size: 24px; font-weight: 800; margin-bottom: 20px;">New Subscription!</h1>
            <p style="font-size: 16px; color: #fff;">You have a new subscriber for the Kinuit Newsletter:</p>
            <div style="margin-top: 20px; padding: 20px; background-color: #111; border: 1px solid #333; border-radius: 12px;">
              <p style="font-size: 18px; font-weight: 600; color: #3b82f6; margin: 0;">${email}</p>
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">This is an automated notification from Kinuit's lead system.</p>
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
            <head>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                body { font-family: 'Inter', sans-serif; background-color: #070707; color: #ffffff; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background-color: #000; border: 1px solid #1a1a1a; border-radius: 24px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; }
                .header { padding: 60px 40px; text-align: center; background: linear-gradient(to bottom, #0a0a0a, #000); border-bottom: 1px solid #1a1a1a; }
                .content { padding: 40px; }
                .footer { padding: 40px; text-align: center; border-top: 1px solid #1a1a1a; background-color: #050505; }
                h1 { font-size: 32px; font-weight: 900; letter-spacing: -0.04em; margin-bottom: 20px; text-transform: uppercase; color: #ffffff; }
                p { font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 24px; }
                .highlight { color: #3b82f6; font-style: italic; }
                .button { display: inline-block; background-color: #ffffff; color: #000000; padding: 18px 36px; border-radius: 12px; font-weight: 900; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 20px; transition: all 0.3s ease; }
                .social-link { color: rgba(255,255,255,0.4); text-decoration: none; font-size: 12px; margin: 0 10px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>KINUIT <span class="highlight">GLOBAL</span></h1>
                  <p style="text-transform: uppercase; font-size: 10px; font-weight: 900; letter-spacing: 0.4em; color: rgba(255,255,255,0.3); margin: 0;">Strategy • Branding • Growth</p>
                </div>
                <div class="content">
                  <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 16px;">YOU'RE IN.</h2>
                  <p>Thank you for joining our newsletter. You've just gained a front-row seat to the engine room of high-performance branding and digital strategy.</p>
                  <p>Every month, we'll drop deep dives into how we're building the next generation of ambitious brands—minus the fluff.</p>
                  <div style="text-align: center;">
                    <a href="https://kinuit.com/work" class="button">See Collective Work</a>
                  </div>
                </div>
                <div class="footer">
                  <div style="margin-bottom: 20px;">
                    <a href="https://linkedin.com/company/kinuit-global" class="social-link">LinkedIn</a>
                    <a href="https://instagram.com/kinuit_global" class="social-link">Instagram</a>
                    <a href="https://x.com/kinuit_global" class="social-link">Twitter</a>
                  </div>
                  <p style="font-size: 10px; color: rgba(255,255,255,0.2); margin: 0;">© ${new Date().getFullYear()} KINUIT GLOBAL. ALL RIGHTS RESERVED.</p>
                  <p style="font-size: 10px; color: rgba(255,255,255,0.2); margin-top: 8px;">YOU ARE RECEIVING THIS BECAUSE YOU SUBSCRIBED AT KINUIT.COM</p>
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
