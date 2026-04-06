declare namespace NodeJS {
  interface ProcessEnv {
    RESEND_API_KEY: string;
    EMAIL_TO: string;
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    GEMINI_API_KEY: string;
  }
}
