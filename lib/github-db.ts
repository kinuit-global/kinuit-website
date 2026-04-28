import fs from "fs";
import path from "path";

const REPO = "kinuit-global/kinuit-website";
const BRANCH = "main"; // Change if deployed from a different branch

/**
 * Fetches the latest JSON data from GitHub to avoid stale reads before Vercel rebuilds
 */
export async function fetchGitHubData(filePath: string): Promise<any | null> {
  if (!process.env.GITHUB_TOKEN) return null;

  try {
    const url = `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Kinuit-CMS",
      },
      next: { revalidate: 0 } // Always fetch latest
    });

    if (!res.ok) return null;

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error fetching from GitHub:", error);
    return null;
  }
}

/**
 * Commits updated JSON data back to GitHub
 */
export async function saveToGitHub(filePath: string, jsonData: any): Promise<boolean> {
  if (!process.env.GITHUB_TOKEN) {
    console.error("GITHUB_TOKEN is missing. Cannot save data to GitHub.");
    return false;
  }

  try {
    const url = `https://api.github.com/repos/${REPO}/contents/${filePath}`;
    
    // 1. Get the current file SHA
    const getRes = await fetch(`${url}?ref=${BRANCH}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Kinuit-CMS",
      },
      cache: 'no-store'
    });

    let sha = undefined;
    if (getRes.ok) {
      const currentData = await getRes.json();
      sha = currentData.sha;
    }

    // 2. Commit the new file
    const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString("base64");
    
    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "Kinuit-CMS",
      },
      body: JSON.stringify({
        message: `Update ${filePath} via Admin Panel`,
        content,
        sha,
        branch: BRANCH,
      }),
    });

    if (!putRes.ok) {
      const errorData = await putRes.json();
      console.error("GitHub API Error:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving to GitHub:", error);
    return false;
  }
}

/**
 * Utility to save data locally (dev) or fallback to GitHub (prod)
 */
export async function persistData(filePath: string, data: any) {
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
  
  if (isVercel) {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN environment variable is missing in Vercel.");
    }
    // We are on Vercel and have a token -> save to GitHub
    const success = await saveToGitHub(filePath, data);
    if (!success) throw new Error("GitHub API rejected the request. Check token permissions or branch name.");
  } else {
    // We are local -> save to file system
    const absolutePath = path.join(process.cwd(), filePath);
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2));
  }
}
