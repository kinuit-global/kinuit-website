export const supabaseFetch = async (
  url: RequestInfo | URL,
  options?: RequestInit,
  retries = 3
): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, {
        ...options,
        keepalive: false,
      });
    } catch (err: any) {
      const errStr = String(err);
      const errMessage = err?.message || "";
      const isConnReset =
        errStr.includes("ECONNRESET") ||
        errMessage.includes("ECONNRESET") ||
        errStr.includes("fetch failed") ||
        errMessage.includes("fetch failed");

      if (isConnReset && i < retries - 1) {
        // Exponential backoff: 150ms, 300ms, 600ms
        await new Promise((resolve) => setTimeout(resolve, 150 * Math.pow(2, i)));
        continue;
      }
      throw err;
    }
  }
  return fetch(url, { ...options, keepalive: false });
};
