import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  inline,
  className,
  children,
  language,
  value,
}) {
  const [copied, setCopied] = useState(false);

  let code = "";
  let lang = language || "text";

  /* ---------- MODE 1: Used by CodeView (editor) ---------- */
  if (typeof value === "string") {
    code = value;
  }

  /* ---------- MODE 2: Used by react-markdown ---------- */
  if (children && typeof value !== "string") {
    const codeElement = children;

    lang =
      codeElement?.props?.className?.replace("language-", "") || "text";

    const child = codeElement?.props?.children;
    code = Array.isArray(child) ? child.join("") : child || "";
  }

  /* ---------- INLINE CODE ---------- */
  if (inline) {
    return <code className={className}>{children}</code>;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="code-block-wrapper">
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>

      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        showLineNumbers
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
