import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const VERCEL_API = "https://api.vercel.com";
const TOKEN = process.env.VERCEL_TOKEN;

router.post("/", async (req, res) => {
  try {
    const { repoName } = req.body;

    if (!repoName) {
      return res.status(400).json({ error: "repoName required" });
    }

    if (!TOKEN) {
      return res.status(500).json({ error: "VERCEL_TOKEN not set" });
    }

    // 1️⃣ Create project (or reuse if exists)
    let project;

    const createRes = await fetch(`${VERCEL_API}/v13/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: repoName }),
    });

    if (createRes.status === 409) {
      // 🔁 Project exists → fetch it
      const getRes = await fetch(
        `${VERCEL_API}/v9/projects/${repoName}`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );

      const data = await getRes.json();
      project = data;
    } else {
      project = await createRes.json();
    }

    // 2️⃣ Create deployment from GitHub repo
    const deployRes = await fetch(`${VERCEL_API}/v13/deployments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: repoName,
        gitSource: {
          type: "github",
          repo: `${process.env.GITHUB_USERNAME}/${repoName}`,
          ref: "main",
        },
        project: project.id,
      }),
    });

    const deployment = await deployRes.json();

    if (!deployRes.ok) {
      return res.status(500).json(deployment);
    }

    return res.json({
      ok: true,
      url: `https://${deployment.url}`,
      deploymentId: deployment.id,
    });

  } catch (err) {
    console.error("Vercel deploy error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
