const { GoogleGenerativeAI } = require("@google/generative-ai");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

async function testSDK() {
  console.log("Testing Gemini SDK with ipv4first...");
  const start = Date.now();
  try {
    const key = process.env.GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    const result = await model.generateContent("Hi");
    console.log(`✅ Success in ${Date.now() - start}ms:`, result.response.text());
  } catch (err) {
    console.error(`❌ Failed in ${Date.now() - start}ms:`, err.message || err);
  }
}

testSDK();
