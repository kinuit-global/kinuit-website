declare namespace NodeJS {
  interface ProcessEnv {
    RESEND_API_KEY: string;
    EMAIL_TO: string;
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    GEMINI_API_KEY: string;
    AUTH_SECRET: string;

    // Cloudinary Credentials (Secure/Signed SDK)
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_URL: string;
    CLOUDINARY_UPLOAD_PRESET: string;

    // GitHub (Production)
    GITHUB_TOKEN?: string;
    VERCEL?: string;
  }
}
