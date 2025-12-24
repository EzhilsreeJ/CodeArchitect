export function detectFramework(files) {
  const paths = files.map(f => f.path.toLowerCase());

  if (paths.includes("manage.py")) return { name: "Django", logo: "django.svg" };
  if (paths.includes("package.json")) return { name: "Node.js", logo: "node.svg" };
  if (paths.some(p => p.includes("src/app.jsx"))) return { name: "React", logo: "react.svg" };

  return { name: "Generic Project", logo: "code.svg" };
}
