import { useState } from "react";

export default function CustomizationPanel({ onApply }) {
  const [customInput, setCustomInput] = useState("");
  const [status, setStatus] = useState("idle"); 
  // idle | applying | done

  const handleApply = async () => {
    if (!customInput.trim() || !onApply) return;

    setStatus("applying");

    try {
      await onApply(customInput); // waits for backend
      setStatus("done");

      // optional auto-reset after 2 seconds
      setTimeout(() => {
        setStatus("idle");
        setCustomInput("");
      }, 2000);
    } catch (err) {
      setStatus("idle");
      alert("Failed to apply changes");
    }
  };

  const getButtonText = () => {
    if (status === "applying") return "Applying changes…";
    if (status === "done") return "Done ✓";
    return "Apply Changes";
  };

  return (
    <div className="customization-panel">
      <h3>Project Customization</h3>

      <textarea
        placeholder="Add features, UI changes, framework options..."
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        disabled={status === "applying"}
      />

      <button
        onClick={handleApply}
        disabled={status !== "idle" || !customInput.trim()}
        className={`apply-btn ${status}`}
      >
        {getButtonText()}
      </button>
    </div>
  );
}
