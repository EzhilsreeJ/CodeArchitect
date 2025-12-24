import fetch from "node-fetch";

export async function generateWithAI({ customization, files }) {
  // 🔹 Simple prompt composition
  const prompt = `
You are an expert software engineer.

Modify the following project according to the user's customization request.

Customization request:
${customization}

Existing project files:
${JSON.stringify(files, null, 2)}

Return ONLY updated files in JSON format:
[
  { "path": "...", "content": "..." }
]
`;

  // 🔹 Gemini / LLM call placeholder
  // (replace with your actual Gemini API logic)
  return files; // TEMP: return unchanged files
}
