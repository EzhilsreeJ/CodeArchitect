
// import express from "express";
// import cors from "cors";
import dotenv from "dotenv";

import { Buffer } from "node:buffer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import deployRoute from "./routes/deploy.js";

dotenv.config({ override: true });
import express from "express";
// import mongoose from "mongoose";
import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";

// -------------------- App Setup --------------------
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/vercel", deployRoute);
console.log("VERCEL TOKEN:", process.env.VERCEL_TOKEN?.slice(0, 6));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

async function generateWithRetry(prompt, retries = 2) {
  try {
    return await model.generateContent(prompt);
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1500));
      return generateWithRetry(prompt, retries - 1);
    }
    throw err;
  }
}

// app.use("/api/auth", authRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

// -------------------- Gemini Setup --------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Lightweight + best for low quota
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});
app.post("/api/customize", async (req, res) => {
  try {
    const { customization, files } = req.body;


    const updatedProject = await generateWithAI({
      customization,
      files,
    });

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;

//   // simple demo auth
//   if (username === "admin" && password === "admin123") {
//     return res.status(200).json({ ok: true });
//   }

//   return res.status(401).json({ error: "Invalid credentials" });
// });

// -------------------- /api/generate --------------------
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, continueFrom } = req.body;

    if ((!prompt || !prompt.trim()) && !continueFrom) {
  return res.status(400).json({ error: "Prompt is required" });
}


    const systemPrompt = `
You are a senior software engineer.

STRICT OUTPUT CONTRACT (DO NOT VIOLATE):
- ALWAYS generate code files
- EVERY file MUST follow this EXACT format
- NEVER skip files
- NEVER stop early
- If output is long, STOP ONLY after finishing a file
- If files remain, end ONLY with:
===CONTINUE===

FORMAT (MANDATORY):

## Project Overview
(short text)

## Project Structure
(tree only)

## Files

### path/to/file.ext
\`\`\`language
FULL CONTENT
\`\`\`
`.trim();

    const finalPrompt = continueFrom
      ? `Continue EXACTLY from here:\n${continueFrom}`
      : `${systemPrompt}\n\nUser request:\n${prompt}`;

    const result = await generateWithRetry(finalPrompt);

    const text = result.response.text();

    res.json({
      text,
      incomplete: text.includes("===CONTINUE==="),
    });
  } catch (err) {
    console.error("❌ GENERATION ERROR:", err);
    res.status(500).json({
      error: "Generation failed",
      details: err.message,
    });
  }
});



// -------------------- GitHub Push Setup --------------------
const GITHUB_API = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "CodeArchitect-App",
  };
}

// Create repo if not exists
async function ensureRepo(repoName) {
  // 1️⃣ Check if repo exists
  const checkRes = await fetch(
    `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
    { headers: githubHeaders() }
  );

  if (checkRes.status === 200) {
    return { created: false };
  }

  if (checkRes.status !== 404) {
    throw new Error(`Repo check failed: ${await checkRes.text()}`);
  }

  // 2️⃣ Create repo if not exists
  const createRes = await fetch(`${GITHUB_API}/user/repos`, {
    method: "POST",
    headers: githubHeaders(),
    body: JSON.stringify({
      name: repoName,
      private: false,
      auto_init: false,
    }),
  });

  if (createRes.status !== 201) {
    throw new Error(`Repo creation failed: ${await createRes.text()}`);
  }

  return { created: true };
}


// Create or update file
async function githubWriteFile({
  owner,
  repo,
  path,
  content,
  message,
}) {
  if (!owner || !repo) {
  throw new Error("GitHub owner or repo missing");
}

  const apiPath = path.replace(/^\/+/, ""); // 🚨 remove leading /

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${apiPath}`;

  // 1️⃣ Check if file exists
  let sha = null;

  const checkRes = await fetch(url, {
    headers: githubHeaders(),
  });

  if (checkRes.status === 200) {
    const data = await checkRes.json();
    sha = data.sha;
  }

  // 2️⃣ Create or update
  const res = await fetch(url, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      ...(sha && { sha }), // ✅ ONLY include sha if updating
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
}

function normalizeGitHubPath(path) {
  return path
    .replace(/^\/+/, "")          // remove leading slash
    .replace(/\\/g, "/")          // windows fix
    .replace(/^\.+\//, "");       // prevent ../
}


// -------------------- /api/github/push --------------------
app.post("/api/github/push", async (req, res) => {
  try {
    const { repoName, files } = req.body;

    if (!repoName) {
      return res.status(400).json({ error: "repoName is required" });
    }

    const { created } = await ensureRepo(repoName);
    if (created) {
  await githubWriteFile({
    owner: GITHUB_USERNAME,
    repo: repoName,
    path: ".gitkeep",
    content: "",
    message: "Initialize repository",
  });
}

    for (const f of files) {
  await githubWriteFile({
    owner: GITHUB_USERNAME,              // ✅ REQUIRED
    repo: repoName,
    path: normalizeGitHubPath(f.path),   // ✅ SAFE
    content: f.content || "",
    message: created
      ? `Initial commit: ${f.path}`
      : `Update ${f.path}`,
  });
}



    const repoUrl = `https://github.com/${GITHUB_USERNAME}/${repoName}`;

    return res.json({
      ok: true,
      created, // ⭐ frontend can know what happened
      repoUrl,
      message: created
        ? "Repository created and initial commit pushed"
        : "Changes committed to existing repository",
    });
  } catch (err) {
    console.error("GitHub push error:", err);
    return res.status(500).json({
      error: "GitHub push failed",
      details: err.message,
    });
  }
});


// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
