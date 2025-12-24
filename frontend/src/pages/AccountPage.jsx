import { useState, useEffect } from "react";

export default function AccountPage({
  userName,
  setUserName,
  theme,
  setTheme,
  onBack,
}) {
    const [geminiKey, setGeminiKey] = useState(
  localStorage.getItem("geminiKey") || ""
);

useEffect(() => {
  localStorage.setItem("geminiKey", geminiKey);
}, [geminiKey]);

const [githubToken, setGithubToken] = useState(
  () => localStorage.getItem("githubToken") || ""
);

useEffect(() => {
  localStorage.setItem("githubToken", githubToken);
}, [githubToken]);

const [vercelToken, setVercelToken] = useState(
  () => localStorage.getItem("vercelToken") || ""
);

useEffect(() => {
  localStorage.setItem("vercelToken", vercelToken);
}, [vercelToken]);

  return (
    <div className="account-page">
      <div className="account-card">
        <h1 className="account-title">Account Settings</h1>

        {/* ───────────── ROW 1 : THEME ───────────── */}
        <div className="account-row full">
          <label>Theme</label>
          <div className="theme-toggle">
            <button
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme("light")}
            >
              ☀️ Light
            </button>
            <button
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme("dark")}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        {/* ───────────── ROW 2 : TWO COLUMNS ───────────── */}
        <div className="account-grid">

          {/* LEFT COLUMN */}
          <div className="account-col">

            <div className="account-row">
              <label>Name</label>
              <EditableField value={userName} onSave={setUserName} />
            </div>

            <div className="account-row">
              <label>Email address</label>
              <div className="account-field readonly">user@email.com</div>
            </div>

            <div className="account-row">
              <label>Gemini Model</label>
              <EditableField value="gemini-1.5-pro" />
            </div>

            <div className="account-row">
  <label>Gemini API Key</label>
  <SecretField value={geminiKey} onSave={setGeminiKey} />
</div>


          </div>

          {/* RIGHT COLUMN */}
          <div className="account-col">

            <div className="account-row">
              <label>GitHub Username</label>
              <EditableField value="github_user" />
            </div>

            <div className="account-row">
              <label>GitHub Token</label>
              <SecretField value={githubToken} onSave={setGithubToken} />

            </div>

            <div className="account-row">
              <label>Vercel Token</label>
              <SecretField value={vercelToken} onSave={setVercelToken} />

            </div>

            <div className="account-row">
              <button className="account-btn primary" onClick={onBack}>
                ← Back to Chat
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* Editable text field */
function EditableField({ value, onSave = () => {} }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  return editing ? (
    <div className="edit-row">
      <input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave(text);
            setEditing(false);
          }
          if (e.key === "Escape") setEditing(false);
        }}
      />
      <button
        onClick={() => {
          onSave(text);
          setEditing(false);
        }}
      >
        Save
      </button>
    </div>
  ) : (
    <div className="account-field editable">
      {text}
      <button className="edit-icon" onClick={() => setEditing(true)}>
        ✏️
      </button>
    </div>
  );
}

/* Secret field with eye toggle */
function SecretField({ value, onSave = () => {} }) {
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  if (editing) {
    return (
      <div className="edit-row">
        <input
          autoFocus
          type={visible ? "text" : "password"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave(text);
              setEditing(false);
            }
            if (e.key === "Escape") {
              setText(value);
              setEditing(false);
            }
          }}
        />
        <button onClick={() => setVisible(!visible)}>👁️</button>
        <button
          onClick={() => {
            onSave(text);
            setEditing(false);
          }}
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="account-field masked">
      {visible ? text : "••••••••••••"}
      <div className="field-actions">
        <button className="edit-icon" onClick={() => setVisible(!visible)}>
          👁️
        </button>
        <button className="edit-icon" onClick={() => setEditing(true)}>
          ✏️
        </button>
      </div>
    </div>
  );
}

