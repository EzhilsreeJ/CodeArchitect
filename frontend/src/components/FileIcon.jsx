import "@vscode/codicons/dist/codicon.css";

export default function FileIcon({ name }) {
  if (name.endsWith(".js")) return <span className="codicon codicon-file-code" />;
  if (name.endsWith(".jsx")) return <span className="codicon codicon-react" />;
  if (name.endsWith(".py")) return <span className="codicon codicon-symbol-class" />;
  if (name.endsWith(".json")) return <span className="codicon codicon-settings" />;
  if (name.endsWith(".html")) return <span className="codicon codicon-file-code" />;
  return <span className="codicon codicon-file" />;
}
