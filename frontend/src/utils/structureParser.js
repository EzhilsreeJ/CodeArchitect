export function normalizeStructure(structureText) {
  if (!structureText) return [];

  const lines = structureText
    .split("\n")
    .map(l => l.replace(/[│├└─]+/g, "").trim())
    .filter(Boolean);

  const files = [];

  lines.forEach(line => {
    if (line.endsWith("/")) return;
    files.push({
      path: line,
      name: line.split("/").pop(),
      content: "",
      language: "text",
    });
  });

  return files;
}
