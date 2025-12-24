export default function StructurePreview({ structure, onClick }) {
  return (
    <pre className="structure-preview" onClick={onClick}>
      {structure}
    </pre>
  );
}
