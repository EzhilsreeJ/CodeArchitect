import { useState, useEffect } from "react";
import { useRef } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
// import { useNavigate } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./components/CodeBlock";
import CodeView from "./components/CodeView";

import AccountPage from "./pages/AccountPage";

const STORAGE_KEY = "codearchitect_chats_v1";

export default function App() {
    // --------- Load persisted state FIRST ---------
  const loadInitialState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const savedState = loadInitialState();
  const [chats, setChats] = useState(
    savedState?.chats || [{ id: Date.now(), title: "New Chat" }]
  );

const [activeChatId, setActiveChatId] = useState(
    savedState?.activeChatId ?? chats[0].id
  );
  const [messagesByChat, setMessagesByChat] = useState(
    savedState?.messagesByChat || {}
  );

const [projectContextByChat, setProjectContextByChat] = useState(
  savedState?.projectContextByChat || {}
);
const [codeTabsByChat, setCodeTabsByChat] = useState(
  savedState?.codeTabsByChat || {}
);
const [activeCodeTabId, setActiveCodeTabId] = useState(null);
const codeTabs = codeTabsByChat[activeChatId] || [];

  const [prompt, setPrompt] = useState("");
  // const [response, setResponse] = useState("");
  const [isSending, setIsSending] = useState(false);
  // Code view tabs (VS Code style)


const prevChatIdRef = useRef(activeChatId);


const [userName, setUserName] = useState(
  localStorage.getItem("userName") || "Ezhil sree"
);
const [isEditingName, setIsEditingName] = useState(false);

useEffect(() => {
  localStorage.setItem("userName", userName);
}, [userName]);

const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "dark"
);
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

  const [highlightedPaths, setHighlightedPaths] = useState(new Set());
// --------- Deploy Modal State ---------
const [showDeployModal, setShowDeployModal] = useState(false);
// const [deployStatus, setDeployStatus] = useState("");
// const [deployUrl, setDeployUrl] = useState("");
// const [isDeploying, setIsDeploying] = useState(false);
const [vercelProjectUrl, setVercelProjectUrl] = useState("");
// const [showDeployMenu, setShowDeployMenu] = useState(false);
// const updatedFiles = extractCodeBlocks(accumulatedText);

const [editingMessageId, setEditingMessageId] = useState(null);
const [editedPrompt, setEditedPrompt] = useState("");
// const [projectContextByChat, setProjectContextByChat] = useState({});


  const [showRepoModal, setShowRepoModal] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const [messagesByChat, setMessagesByChat] = useState({});
  const [githubRepoUrl, setGithubRepoUrl] = useState("");
const [isAuth, setIsAuth] = useState(
  localStorage.getItem("isAuth") === "true"
);
const [page, setPage] = useState("chat"); // chat | account

// const navigate = useNavigate();

  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const currentMessages = messagesByChat[activeChatId] || [];
  // Track which chat's menu is open
  const [openMenuId, setOpenMenuId] = useState(null);


  const [expandedMessages, setExpandedMessages] = useState({});
const getCollapsedText = (text, expanded, maxLines = 12) => {
  const lines = text.split("\n");
  if (expanded || lines.length <= maxLines) {
    return text;
  }
  return lines.slice(0, maxLines).join("\n");
};

  const isNewProjectPrompt = (text) => {
  return /\b(new project|start over|create new|fresh project)\b/i.test(text);
};
const getDeployLabel = () => {
  if (!githubRepoUrl) return "Push to GitHub first";
  if (!vercelProjectUrl) return "Connect to Vercel";
  return "Open Live Site";
};

const derivedVercelUrl = `https://${repoName}.vercel.app`;
const detectFramework = (files) => {
  if (files.some(f => f.path.includes("next.config.js"))) return "nextjs";
  if (files.some(f => f.path.includes("vite.config.js"))) return "react";
  if (files.some(f => f.path.includes("index.html"))) return "static";
  return "react";
};


  const filteredChats = chats.filter(chat =>
  chat.title.toLowerCase().includes(searchQuery.toLowerCase())
);
const openDeployModal = () => {
  if (!repoName && !githubRepoUrl) {
    alert("Please push the project to GitHub before deploying.");
    return;
  }

  // setDeployStatus("");
  // setDeployUrl("");
  setShowDeployModal(true);
};
  // --------- GitHub (modal + push) ---------
  const openRepoModal = () => {
    setPushStatus("");
    setShowRepoModal(true);
  };
const normalizeStructure = (structureText = "") => {
  const lines = structureText.split("\n");

  const stack = [];
  const files = [];

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;

    // Count indentation by tree symbols
    const level =
      (rawLine.match(/[│├└]/g) || []).length;

    const name = rawLine
      .replace(/[│├└─]+/g, "")
      .trim();

    stack[level] = name;
    stack.length = level + 1;

    const path = stack.join("/");

    files.push({
      path,
      name,
      language: "text",
      content: "",
    });
  }

  return files;
};

const mergeStructureWithFiles = (structureFiles, codeFiles) => {
  const codeMap = new Map(codeFiles.map((f) => [f.path, f]));

  const merged = structureFiles.map((f) =>
    codeMap.get(f.path)
      ? codeMap.get(f.path)
      : f
  );

  // Add files that exist ONLY in code blocks
  for (const f of codeFiles) {
    if (!merged.find((m) => m.path === f.path)) {
      merged.push(f);
    }
  }

  return merged;
};

const renamePathsWithProject = (files) => {
  return files.map((file) => ({
    ...file,
    path: file.path.replace(/^\/+/, ""), // keep paths clean
  }));
};
const handleViewRepo = () => {
  if (!githubRepoUrl) {
    alert("Push to GitHub first");
    return;
  }
  window.open(githubRepoUrl, "_blank");
};

const handleDeployToVercel = () => {
  if (!githubRepoUrl) {
    alert("Push to GitHub first");
    return;
  }
  const importUrl = `https://vercel.com/new/import?s=${githubRepoUrl}`;
  window.open(importUrl, "_blank");
};

const handleOpenLiveSite = () => {
  if (!vercelProjectUrl) {
    alert("Deploy the project first.");
    return;
  }

  window.open(vercelProjectUrl, "_blank");
};



const connectToVercel = () => {
  if (!githubRepoUrl) {
    alert("Push to GitHub first");
    return;
  }

  const importUrl = `https://vercel.com/new/import?s=${githubRepoUrl}`;
  window.open(importUrl, "_blank");
};

const handlePushToGithub = async () => {
  if (!activeCodeTabId) {
    alert("Open a project in the Code Panel before pushing.");
    return;
  }
  const activeTab = codeTabs.find(
    (t) => t.id === activeCodeTabId
  );

  if (!activeTab || !activeTab.files.length) {
    alert("No files found in Code Panel.");
    return;
  }
  setIsPushing(true);
  setPushStatus("");

  try {
    const res = await fetch("http://localhost:5000/api/github/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      
      body: JSON.stringify({
        repoName,
        files: stripProjectRoot(activeTab.files, activeTab.title),
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Push failed");

    setGithubRepoUrl(data.repoUrl);
    const repo = data.repoUrl.split("/").pop();
// setVercelProjectUrl(`https://${repo}.vercel.app`);
    setPushStatus(
      data.created
        ? "✔ Repo created and code pushed"
        : "✔ Changes committed to existing repo"
    );
  } catch (err) {
    setPushStatus("❌ " + err.message);
  } finally {
    setIsPushing(false);
  }
};

async function ensureRepo(repoName) {
  // 1️⃣ Check if repo already exists
  const checkRes = await fetch(
    `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
    { headers: githubHeaders() }
  );

  if (checkRes.status === 200) {
    return { created: false, exists: true };
  }

  // 2️⃣ If not exists → create
  if (checkRes.status === 404) {
    const createRes = await fetch(`${GITHUB_API}/user/repos`, {
      method: "POST",
      headers: githubHeaders(),
      body: JSON.stringify({
        name: repoName,
        private: false,
      }),
    });

    if (createRes.status === 201) {
      return { created: true, exists: false };
    }

    throw new Error(`Repo creation failed: ${await createRes.text()}`);
  }

  throw new Error(`Repo check failed: ${await checkRes.text()}`);
}


// const handleViewRepo = () => {
//   if (!githubRepoUrl) return;
//   window.open(githubRepoUrl, "_blank");
// };
useEffect(() => {
  const payload = {
  chats,
  messagesByChat,
  projectContextByChat,
  codeTabsByChat,
  activeChatId,
};

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}, [chats, messagesByChat, projectContextByChat, activeChatId]);


  // --------- Sidebar chat actions ---------
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
    };
    setChats((prev) => [newChat, ...prev]); // add to top
    setActiveChatId(newChat.id);
    setOpenMenuId(null);
  };
  
  // Start rename mode for a chat
const startRenameChat = (chat) => {
  setEditingChatId(chat.id);
  setEditingTitle(chat.title);
  setOpenMenuId(null);
};

// Save the new name
const saveRenameChat = () => {
  if (!editingTitle.trim()) {
    // if empty, just cancel
    setEditingChatId(null);
    setEditingTitle("");
    return;
  }

  setChats((prev) =>
    prev.map((chat) =>
      chat.id === editingChatId ? { ...chat, title: editingTitle.trim() } : chat
    )
  );
  setEditingChatId(null);
  setEditingTitle("");
};

// Cancel rename (on Esc)
const cancelRenameChat = () => {
  setEditingChatId(null);
  setEditingTitle("");
};

  const renameChat = (id) => {
    const current = chats.find((c) => c.id === id);
    const newTitle = window.prompt(
      "Enter new chat name:",
      current?.title || "New Chat"
    );

    if (!newTitle || !newTitle.trim()) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle.trim() } : chat
      )
    );
  };
  const handleSearch = () => {
  if (!searchQuery.trim()) return;

  const foundChat = chats.find(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (foundChat) {
    setActiveChatId(foundChat.id);
  } else {
    alert("No chat found with that name.");
  }
};

  const deleteChat = (id) => {
  setChats(prev => prev.filter(c => c.id !== id));

  setMessagesByChat(prev => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
  });

  setProjectContextByChat(prev => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
  });

  if (activeChatId === id) {
    const remaining = chats.filter(c => c.id !== id);
    setActiveChatId(remaining[0]?.id || null);
  }

  setOpenMenuId(null);
};


  const startEditPrompt = (msg) => {
  setEditingMessageId(msg.id);
  setEditedPrompt(msg.text);
};
const cancelEditPrompt = () => {
  setEditingMessageId(null);
  setEditedPrompt("");
};
function generateReadme(aiText, projectName) {
  const overview = extractProjectSummary(aiText);
  const structure = extractProjectStructure(aiText);

  return `# ${projectName}

${overview}

## Project Structure
\`\`\`
${structure}
\`\`\`

---

Generated using **CodeArchitect**
`;
}


const saveEditedPrompt = async (msgId) => {
  if (!editedPrompt.trim()) return;

  const newPrompt = editedPrompt.trim();

  // 1️⃣ Replace edited user message
  setMessagesByChat((prev) => {
    const msgs = prev[activeChatId] || [];
    const index = msgs.findIndex((m) => m.id === msgId);

    if (index === -1) return prev;

    return {
      ...prev,
      [activeChatId]: [
        ...msgs.slice(0, index),
        { ...msgs[index], text: newPrompt },
      ],
    };
  });

  setEditingMessageId(null);
  setEditedPrompt("");
  setIsSending(true);

  // 2️⃣ Regenerate AI response
  try {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Regenerate the project based on this updated request:\n\n${newPrompt}`,
      }),
    });

    const data = await res.json();

    setMessagesByChat((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        {
          id: Date.now(),
          role: "ai",
          text: data.text || "Failed to regenerate",
        },
      ],
    }));
  } catch {
    alert("Failed to regenerate AI response");
  } finally {
    setIsSending(false);
  };





  const projectName =
  existingContext?.projectName || getProjectNameFromPrompt(newPrompt);

  // 1️⃣ Update user message + remove old AI response
  // Add user message once
setMessagesByChat((prev) => {
  const existingMessages = prev[activeChatId] || [];

  return {
    ...prev,
    [activeChatId]: [
      ...existingMessages,
      { id: Date.now(), role: "user", text: userText },
    ],
  };
});




  setEditingMessageId(null);
  setEditedPrompt("");
  setIsSending(true);

  // 2️⃣ Re-generate AI response
  try {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `
Regenerate the FULL project completely.
Do not stop midway.
Continue until ALL files are fully generated.

User request:
${newPrompt}
        `,
      }),
    });
    const extractOverview = (text) => {
  return text.split("## Files")[0].trim();
};

    const data = await res.json();
    const aiText = res.ok ? data.text : "Failed to regenerate";

    setMessagesByChat((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        {
          id: Date.now(),
          role: "ai",
          text: aiText,
          projectName,
        },
      ],
    }));
  } 
  catch (err) {
    setMessagesByChat((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        {
          id: Date.now(),
          role: "ai",
          text: "Error regenerating response",
        },
      ],
    }));
  } finally {
    setIsSending(false);
  }
};
const forceRootFolder = (files, rootFolder) => {
  return files.map((file) => {
    // avoid double prefix
    if (file.path.startsWith(rootFolder + "/")) {
      return file;
    }

    return {
      ...file,
      path: `${rootFolder}/${file.path}`,
    };
  });
};
const handleDeploy = () => {
  if (!githubRepoUrl) {
    alert("Push the project to GitHub first.");
    return;
  }

  const repo = githubRepoUrl.split("/").pop();

  // ✅ REAL live URL (Vercel standard)
  const liveUrl = `https://${repo}.vercel.app`;
  setVercelProjectUrl(liveUrl);

  // Open Vercel deploy/import page
  const importUrl = `https://vercel.com/new/import?s=${githubRepoUrl}`;
  window.open(importUrl, "_blank");
};



const redeployOnVercel = () => {
  const repo = githubRepoUrl.split("/").pop();

  // Opens redeploy page for SAME project
  const redeployUrl = `https://vercel.com/${repo}/${repo}/deployments`;

  window.open(redeployUrl, "_blank");
};

const handleSend = async () => {
  if (!prompt.trim() || !activeChatId) return;

  const userText = prompt.trim();
  // 🔹 Get existing project context (if any)
const existingContext = projectContextByChat[activeChatId];
const projectName =
  existingContext?.projectName || getProjectNameFromPrompt(userText);


// 🔹 Decide final prompt
let finalPrompt = userText;


if (existingContext && !isNewProjectPrompt(userText)) {
  finalPrompt = `
You are modifying an EXISTING project.

Original request:
${existingContext.basePrompt}

Current files:
${existingContext.files.map(
  f => `\nFILE: ${f.path}\n${f.content}`
).join("\n")}

Previous changes:
${existingContext.history.join("\n")}

New change request:
${userText}

Rules:
- Modify existing files
- Do NOT create a new project
- Keep filenames unchanged
- Return FULL updated files
`;
} else {
  finalPrompt = `
Generate a COMPLETE new software project.

User request:
${userText}

Include:
- Project overview
- Folder structure
- Full code
`;
}


setPrompt("");
setIsSending(true);

// ✅ AUTO-RENAME CHAT ON FIRST MESSAGE ONLY
setChats((prevChats) =>
  prevChats.map((chat) => {
    if (chat.id === activeChatId && chat.title === "New Chat") {
      return {
        ...chat,
        title: getChatTitleFromPrompt(userText),
      };
    }
    return chat;
  })
);

  setPrompt("");
  setIsSending(true);

  let accumulatedText = "";
  let continueFrom = null;
  let hasMore = true;

  // Add user message once
  setMessagesByChat((prev) => ({
    ...prev,
    [activeChatId]: [
      ...(prev[activeChatId] || []),
      { id: Date.now(), role: "user", text: userText },
    ],
  }));

  while (hasMore) {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
  continueFrom
    ? { continueFrom }
    : { prompt: finalPrompt }
),

      });


    if (!res.ok) {
  setIsSending(false);
  alert("AI generation failed. Try again.");
  return;
}


const data = await res.json();


    accumulatedText += "\n" + data.text;
    hasMore = data.incomplete === true;

    // Continue from last output
    continueFrom = data.text;
  }

  // Add ONE AI message with full content
  setMessagesByChat((prev) => ({
    ...prev,
    [activeChatId]: [
      ...(prev[activeChatId] || []),
      {
        id: Date.now() + 1,
        role: "ai",
        text: accumulatedText,
      },
    ],
  }
  
));



const updatedFiles = extractCodeBlocks(accumulatedText);

// 🔹 Save / update project context for this chat
setProjectContextByChat(prev => {
  const existing = prev[activeChatId];

  // NEW PROJECT
  if (!existing || isNewProjectPrompt(userText)) {
    return {
      ...prev,
      [activeChatId]: {
        basePrompt: userText,
        projectName,
        files: updatedFiles,      // ✅ REQUIRED
        history: [],
      },
    };
  }

  // CONTINUATION
  return {
    ...prev,
    [activeChatId]: {
      ...existing,
      files: updatedFiles,       // ✅ UPDATE FILES
      history: [...existing.history, userText],
    },
  };
});


  setIsSending(false);
};
const openCodePanelFromMessage = (msg) => {
  const codeFiles = extractCodeBlocks(msg.text);
  if (!codeFiles.length) return;

  const projectName =
    msg.projectName || getProjectNameFromPrompt(msg.text);

  const filesWithRoot = forceRootFolder(
    [
      {
        path: "README.md",
        name: "README.md",
        language: "markdown",
        content: generateReadme(msg.text, projectName),
      },
      ...codeFiles,
    ],
    projectName
  );

  const tabId = Date.now();

  setCodeTabsByChat(prev => ({
    ...prev,
    [activeChatId]: [
      ...(prev[activeChatId] || []),
      {
        id: tabId,
        title: projectName,
        files: filesWithRoot,
      },
    ],
  }));

  setActiveCodeTabId(tabId); // ✅ ONLY state updates
};



const extractCodeBlocks = (text) => {
  if (!text) return [];

  const files = [];
  const lines = text.split("\n");
  let currentFile = null;
  let buffer = [];
  let language = "text";

  for (let line of lines) {
    // Filename heading
    if (/^#{2,4}\s+/.test(line)) {
      currentFile = line.replace(/^#{2,4}\s+/, "").trim();
      continue;
    }

    // Start code block
    if (line.startsWith("```")) {
      if (buffer.length && currentFile) {
        files.push({
          path: currentFile,
          name: currentFile.split("/").pop(),
          language,
          content: buffer.join("\n").trim(),
        });
        buffer = [];
      }

      language = line.replace("```", "").trim() || "text";
      continue;
    }

    // End handled implicitly
    if (currentFile) buffer.push(line);
  }

  return files;
};



const extractProjectStructure = (text) => {
  if (!text) return "";

  const start = text.indexOf("## Project Structure");
  if (start === -1) return "";

  const afterStart = text.slice(start);
  const end = afterStart.indexOf("##", 5);

  return (end === -1 ? afterStart : afterStart.slice(0, end))
    .replace("## Project Structure", "")
    .trim();
};
const stripProjectRoot = (files, projectName) => {
  return files.map(file => ({
    ...file,
    path: file.path.startsWith(projectName + "/")
      ? file.path.replace(projectName + "/", "")
      : file.path
  }));
};

const stripCodeBlocks = (text) => {
  if (!text) return "";

  // Remove ``` fenced blocks completely
  return text.replace(/```[\s\S]*?```/g, "").trim();
};
const getChatTitleFromPrompt = (prompt) => {
  if (!prompt) return "New Chat";

  // Clean + shorten
  return prompt
    .replace(/generate|create|build|project|application|app/gi, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .split(" ")
    .slice(0, 5)
    .join(" ")
    || "New Chat";
};

const extractProjectSummary = (text = "") => {
  if (!text) return "";

  const cleanText = stripCodeBlocks(text);

  const allowed = [
    "## Project Overview",
    "## Overview",
    "## Features",
    "## Key Features",
  ];

  let output = "";
  let collect = false;

  for (const line of cleanText.split("\n")) {
    // start collecting allowed sections
    if (allowed.some((h) => line.startsWith(h))) {
      collect = true;
    }

    // 🔥 STOP on ANY Project Structure indicator
    if (
      line.toLowerCase().includes("project structure") ||
      line.startsWith(".") ||
      line.startsWith("├") ||
      line.startsWith("└")
    ) {
      break;
    }

    if (collect) output += line + "\n";
  }

  return output.trim();
};
const newPrompt = editedPrompt.trim();

const getProjectNameFromPrompt = (prompt) => {
  if (!prompt) return "project";

  const text = prompt.toLowerCase();
  const match =
    text.match(/(?:generate|create|build)\s+(?:a|an)?\s*([\w\s-]+?)\s+(?:app|application|website|project)/) ||
    text.match(/([\w\s-]+?)\s+(?:app|application|website|project)/);

  if (!match) return "project";

  return match[1]
    .trim()
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
    
  //   const getProjectNameFromPrompt = (prompt) => {
  // if (!prompt) return "project";

  // const text = prompt.toLowerCase();
  // const match =
  //   text.match(/(?:generate|create|build)\s+(?:a|an)?\s*([\w\s-]+?)\s+(?:app|application|website|project)/) ||
  //   text.match(/([\w\s-]+?)\s+(?:app|application|website|project)/);

  // if (!match) return "project";

  // return match[1]
  //   .trim()
  //   .replace(/[^a-z0-9\s-]/gi, "")
  //   .replace(/\s+/g, "-")
  //   .toLowerCase();
};
const handleDownloadZip = async () => {
  if (!activeCodeTabId) {
    alert("Open a project in the Code Panel first.");
    return;
  }

  const activeTab = codeTabs.find(t => t.id === activeCodeTabId);
  if (!activeTab) return;

  const res = await fetch("http://localhost:5000/api/download/zip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectName: activeTab.title,
      files: activeTab.files,
    }),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${activeTab.title}.zip`;
  a.click();

  window.URL.revokeObjectURL(url);
};


  // --------- UI ---------
  return (
    <>
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="nav-left">
          <span className="logo">CodeArchitect</span>
        </div>

        <div className="nav-right">
  <button className="top-icon-btn" aria-label="Share chat">
    ⤴
  </button>

  <button
    className="top-icon-btn"
    onClick={() => {
      localStorage.removeItem("isAuth");
      setIsAuth(false);
      window.location.reload();
    }}
  >
    Logout
  </button>

  <div className="profile"></div>
</div>


      </header>

      {/* Left Sidebar */}
      <aside className="sidebar">
  {/* Scrollable chats section */}
  <div className="sidebar-main">
    <button className="new-chat" onClick={createNewChat}>
      + New Chat
    </button>

    <h3 className="sidebar-title">Your chats</h3>
    {activeCodeTabId && (
  <div className="framework-info">
    Framework:{" "}
    {detectFramework(
      codeTabs.find(t => t.id === activeCodeTabId)?.files || []
    )}
  </div>
)}

<ul className="chat-list">
  {filteredChats.length > 0 ? (
    filteredChats.map((chat) => (
      <li
        key={chat.id}
        className={chat.id === activeChatId ? "active-chat" : ""}
        onClick={() => {
          setActiveChatId(chat.id);
          setOpenMenuId(null);
        }}
      >
        <div className="chat-item">
          {editingChatId === chat.id ? (
            <input
              className="chat-rename-input"
              autoFocus
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onBlur={saveRenameChat}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveRenameChat();
                if (e.key === "Escape") cancelRenameChat();
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="chat-title">{chat.title}</span>
          )}

          <button
            className="chat-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId((prev) => (prev === chat.id ? null : chat.id));
            }}
          >
            ⋮
          </button>
        </div>

        {openMenuId === chat.id && (
          <div className="chat-menu" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => startRenameChat(chat)}>Rename</button>
            <button onClick={() => deleteChat(chat.id)}>Delete</button>
          </div>
        )}
      </li>
    ))
  ) : (
    <li className="no-chats">No chats found</li>
  )}
</ul>

{/* ⭐ CODE TABS START HERE ⭐ */}
<h3 className="sidebar-title" style={{ marginTop: "12px" }}>Code</h3>

<ul className="chat-list">
  {codeTabs.map((tab) => (
    <li
      key={tab.id}
      className={tab.id === activeCodeTabId ? "active-chat" : ""}
      onClick={() => setActiveCodeTabId(tab.id)}
    >
      <span>📁 {tab.title}</span>
    </li>
  ))}
</ul>

  </div>

  {/* Fixed search at bottom */}
  <div className="sidebar-search">
    <div className="search-chats">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search chats"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      
    </div>
  </div>

  {/* Account footer (still at very bottom) */}
  <div className="sidebar-footer">
    <div className="account">
      <div className="avatar-circle">ES</div>
      <div className="account-info">
        <div className="account-name">Ezhil sree</div>
        <div className="account-plan">Go</div>
      </div>

      <button
  className="account-menu"
  aria-label="Account menu"
  onClick={() => setPage("account")}
>
  ⋮
</button>


    </div>
  </div>
</aside>


      {/* Main Content Area */}
      <main className="main-area">
        
        
       {page === "account" && (
  <AccountPage
    userName={userName}
    setUserName={setUserName}
    isEditingName={isEditingName}
    setIsEditingName={setIsEditingName}
    theme={theme}
    setTheme={setTheme}
    onBack={() => setPage("chat")}
  />
)}



  {activeCodeTabId ? (
  <CodeView
  tab={codeTabs.find(t => t.id === activeCodeTabId)}
  onClose={() => setActiveCodeTabId(null)}
  onPushToGitHub={openRepoModal}
  onDeploy={openDeployModal}
  highlightedPaths={highlightedPaths}
/>





) : (
  <>
    {/* Header / chat title */}
    <div className="chat-header">
      <h1 className="welcome-text">
        {chats.find((c) => c.id === activeChatId)?.title || "New Chat"}
      </h1>
    </div>

    {/* Messages area */}
    <div className="chat-messages">
      {currentMessages.length === 0 ? (
        <div className="empty-chat">Start a conversation in this chat ✨</div>
      ) : (
        currentMessages.map((msg) => {
  const isExpanded = expandedMessages[msg.id] || false;

  return (
    <div
      key={msg.id}
      className={
        "message-row " +
        (msg.role === "user"
          ? "message-row-user"
          : "message-row-ai")
      }
    >
      <div
        className={
          "message-bubble " +
          (msg.role === "user"
            ? "message-bubble-user"
            : "message-bubble-ai")
        }
      >
        {/* USER MESSAGE */}
        {msg.role === "user" ? (
  <div className="user-message">
    {editingMessageId === msg.id ? (
      <div className="edit-prompt-box">
        <input
          autoFocus
          value={editedPrompt}
          onChange={(e) => setEditedPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEditedPrompt(msg.id);
            if (e.key === "Escape") cancelEditPrompt();
          }}
        />
        <button onClick={() => saveEditedPrompt(msg.id)}>Save</button>
        <button onClick={cancelEditPrompt}>Cancel</button>
      </div>
    ) : (
      <>
        <span>{msg.text}</span>
        <button className="edit-btn" onClick={() => startEditPrompt(msg)}>
          ✏️
        </button>
      </>
    )}
  </div>
) : (

          /* AI MESSAGE */
          !activeCodeTabId && (
            <div className="project-overview">
              {/* 🤖 AI HEADER */}
              <div className="ai-card-header">
    <div className="ai-header">
      🤖 <span>CodeArchitect AI</span>
    </div>

    <button
      className="view-code-btn"
      onClick={() => openCodePanelFromMessage(msg)}
    >
      View Code
    </button>
  </div>

              {/* 📄 COLLAPSIBLE SUMMARY */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code() {
                    return null; // ❌ no code in chat
                  },
                  pre() {
                    return null;
                  },
                }}
              >
                {getCollapsedText(msg.text, isExpanded)}
              </ReactMarkdown>

              {/* 🔽 SHOW MORE / LESS */}
              {msg.text.split("\n").length > 12 && (
                <button
                  className="show-more-btn"
                  onClick={() =>
                    setExpandedMessages((prev) => ({
                      ...prev,
                      [msg.id]: !prev[msg.id],
                    }))
                  }
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
})
      )
      }
    </div>

    {/* Input bar */}
    <div className="chat-input-bar">
      <div className="search-box">
        <input
          type="text"
          placeholder="Ask anything"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        {/* <button className="icon-btn mic">🎤</button>
        <button className="icon-btn more">●●●</button> */}

        <button
          className="action-btn send-btn"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>

      

        
      </div>
    </div>
  </>
)}



</main>


      {/* Repo Name Modal */}
      {showRepoModal && (
        <div className="modal-backdrop" onClick={() => setShowRepoModal(false)}>
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 className="modal-title">Push to GitHub</h2>
            <p className="modal-text">
              Enter a repository name. If it doesn’t exist, it will be created.
              If it already exists, current project files will be pushed.
            </p>

            <input
              className="modal-input"
              type="text"
              placeholder="my-awesome-repo"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />

            {pushStatus && <p className="status-text">{pushStatus}</p>}

            <div className="modal-actions">
  <button
    className="action-btn github-btn"
    onClick={handlePushToGithub}
    disabled={isPushing}
  >
    {isPushing ? "Pushing..." : "Push"}
  </button>

  <button
  className="action-btn github-btn"
  onClick={handleViewRepo}
  disabled={!githubRepoUrl}
>
  View Repo
</button>


  <button
    className="action-btn cancel-btn"
    type="button"
    onClick={() => setShowRepoModal(false)}
  >
    Cancel
  </button>
</div>
          </div>
        </div>
      )}

      {/* Deploy Modal */}
      {showDeployModal && (
  <div className="modal-backdrop" onClick={() => setShowDeployModal(false)}>
   

  {showDeployModal && (
  <div className="modal-backdrop" onClick={() => setShowDeployModal(false)}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <h2 className="modal-title">Deploy Project</h2>

      <p className="modal-text">
        Deploy or redeploy this project to Vercel.
      </p>

      <div className="modal-actions deploy-actions">
        <button
  className="action-btn deploy-btn"
  onClick={handleDeploy}
>
  {vercelProjectUrl ? "🔁 Redeploy" : "🚀 Deploy"}
</button>

<button
  className="action-btn deploy-btn"
  onClick={handleOpenLiveSite}
>
  {vercelProjectUrl ? "🌍 Open Live Site" : "🚀 First Deploy to Vercel"}
</button>

        <button
          className="action-btn cancel-btn"
          onClick={() => setShowDeployModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
<button
  onClick={() => {
    localStorage.removeItem("isAuth");
    window.location.reload();
  }}
>
  Logout
</button>




    </div>
  
)

}
    </>
    
  );
}