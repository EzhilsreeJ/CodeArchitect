import { useState, useRef, useEffect } from "react";
import CodeBlock from "./CodeBlock";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "@vscode/codicons/dist/codicon.css";
// import CustomizationPanel from "./CustomizationPanel";

/* ---------- PROJECT TYPE DETECTION ---------- */
function detectProjectType(files) {
  const paths = files.map((f) => f.path.toLowerCase());

  if (paths.some((p) => p.includes("manage.py"))) return "django";
  if (paths.some((p) => p.includes("package.json"))) return "node";
  if (paths.some((p) => p.includes("src/app.jsx") || p.includes("src/main.jsx")))
    return "react";
  if (paths.some((p) => p.endsWith(".html"))) return "html";
  return "generic";
}

/* ---------- TREE PREFIX ---------- */
function TreePrefix({ isLastList }) {
  return (
    <span className="tree-prefix">
      {isLastList.map((isLast, i) => (
        <span key={i} className="tree-line">
          {isLast ? "   " : "│  "}
        </span>
      ))}
    </span>
  );
}

/* ---------- BUILD TREE ---------- */
function buildFileTree(files) {
  const root = {};

  files.forEach((file) => {
    const parts = file.path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = { __children: {}, __file: null };
      }
      if (index === parts.length - 1) {
        current[part].__file = file;
      }
      current = current[part].__children;
    });
  });

  return root;
}

/* ---------- FOLDER NODE ---------- */
function FolderNode({
  name,
  node,
  onFileClick,
  expandAll,
  isLastList = [],
  highlightedPaths,
}) {
  const isFile = !!node.__file;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(expandAll);
  }, [expandAll]);

  // const filePath = node.__file?.path;
  // const isHighlighted = filePath && highlightedPaths?.has(filePath);

  const children = Object.entries(node.__children || {});

  return (
    <div className="tree-node">
      <div
        className={"tree-row"}
        onClick={() =>
          isFile ? onFileClick(node.__file) : setOpen((o) => !o)
        }
      >
        <TreePrefix isLastList={isLastList} />
        <span className="tree-branch">
          {isLastList.length
            ? isLastList[isLastList.length - 1]
              ? "└─ "
              : "├─ "
            : ""}
        </span>
        <span className="tree-label">{name}</span>
      </div>

      {!isFile && open && (
        <div>
          {children.map(([childName, childNode], index) => (
            <FolderNode
              key={childName}
              name={childName}
              node={childNode}
              onFileClick={onFileClick}
              expandAll={expandAll}
              highlightedPaths={highlightedPaths}
              isLastList={[
                ...isLastList,
                index === children.length - 1,
              ]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function CodeView({
  tab,
  onClose,
  onPushToGitHub,
  onDeploy,
  // onCustomize,
  // highlightedPaths = new Set(),
}) {
  const [activeFile, setActiveFile] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandAll, setExpandAll] = useState(true);

  const files = tab?.files || [];
  const originalFilesRef = useRef([]);

  /* ---------- SYNC ON TAB CHANGE ---------- */
  useEffect(() => {
  if (!tab || !files.length) return;

  // 🔑 IMPORTANT: refresh original reference after customization
  originalFilesRef.current = files.map(f => ({ ...f }));

  const updatedActive =
    files.find(f => f.path === activeFile?.path) || files[0];

  setActiveFile(updatedActive);
  setEditedContent(updatedActive.content);
  setIsEditing(false);
}, [files]);





  /* ---------- SYNC ON FILE CHANGE ---------- */
  useEffect(() => {
    if (!activeFile) return;
    setEditedContent(activeFile.content);
  }, [activeFile]);

  if (!tab || !files.length || !activeFile) {
    return <div className="code-view">No project loaded</div>;
  }

  const projectType = detectProjectType(files);
  const tree = buildFileTree(files);

  /* ---------- ACTIONS ---------- */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      isEditing ? editedContent : activeFile.content
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleSave = () => {
    activeFile.content = editedContent;
    setIsEditing(false);
  };

  const handleUndo = () => {
    const original = originalFilesRef.current.find(
      (f) => f.path === activeFile.path
    );
    if (!original) return;
    activeFile.content = original.content;
    setEditedContent(original.content);
    setIsEditing(false);
  };

  const handleResetAll = () => {
    files.forEach((file) => {
      const original = originalFilesRef.current.find(
        (f) => f.path === file.path
      );
      if (original) file.content = original.content;
    });
    setActiveFile(files[0]);
    setEditedContent(files[0].content);
    setIsEditing(false);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    files.forEach((file) => zip.file(file.path, file.content));
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${tab.title || "project"}.zip`);
  };

  /* ---------- UI ---------- */
  return (
    <div className="code-view">
      <div className="project-header">
        {projectType === "django" && "🟢 Django Project"}
        {projectType === "react" && "⚛️ React Project"}
        {projectType === "node" && "🟩 Node.js Project"}
        {projectType === "html" && "🌐 HTML Project"}
      </div>

      {/* <CustomizationPanel onApply={onCustomize} /> */}

      <div className="code-view-body">
        {/* ---------- EXPLORER ---------- */}
        <aside className="code-explorer">
          <div className="explorer-title">
            EXPLORER
            <div className="explorer-actions">
              <button onClick={() => setExpandAll(true)}>Expand All</button>
              <button onClick={() => setExpandAll(false)}>Collapse All</button>
            </div>
          </div>

          {Object.entries(tree).map(([name, node], index, arr) => (
            <FolderNode
              key={name}
              name={name}
              node={node}
              expandAll={expandAll}
              // highlightedPaths={highlightedPaths}
              isLastList={[index === arr.length - 1]}
              onFileClick={(file) => {
                setActiveFile(file);
                setIsEditing(false);
              }}
            />
          ))}
        </aside>

        {/* ---------- EDITOR ---------- */}
        <section className="code-editor">
          <div className="editor-header">
            <span>{activeFile.path}</span>

            <div className="editor-actions">
              <button onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </button>

              {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              ) : (
                <button onClick={handleSave}>Save</button>
              )}

              <button onClick={handleUndo}>Undo</button>
              <button onClick={handleResetAll}>Reset All</button>
              <button onClick={handleDownloadZip}>Download ZIP</button>
              <button onClick={onDeploy}>Deploy</button>
              <button onClick={onPushToGitHub}>Push to GitHub</button>
              <button onClick={onClose}>✖</button>
            </div>
          </div>

          <div className="editor-body">
            {isEditing ? (
              <textarea
                className="code-textarea"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <CodeBlock
                language={activeFile.language}
                value={activeFile.content}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
