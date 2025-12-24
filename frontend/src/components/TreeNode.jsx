export default function TreeNode({ node, depth, onClick }) {
  return (
    <div style={{ paddingLeft: depth * 14 }}>
      <span className="tree-line">
        {depth > 0 && "│ ".repeat(depth - 1)}
        ├─
      </span>
      <span onClick={() => node.file && onClick(node.file)}>
        {node.icon} {node.name}
      </span>
      {node.children?.map((c, i) => (
        <TreeNode key={i} node={c} depth={depth + 1} onClick={onClick} />
      ))}
    </div>
  );
}
