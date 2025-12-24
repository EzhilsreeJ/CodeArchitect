import { useState } from "react";
import CuteLamp from "../components/CuteLamp";
import "./auth.css";

export default function Auth({ onAuth }) {
  const [lampOn, setLampOn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(); // frontend-only success
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">CODEARCHITECT</h1>

      {/* Lamp */}
      <div className="lamp-wrapper">
        <CuteLamp lampOn={lampOn} onToggle={setLampOn} />
      </div>

      {/* Floating Auth Box */}
      <div className={`auth-box ${lampOn ? "show" : ""}`}>
        <form onSubmit={handleSubmit}>
          <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

          {isSignup && (
            <input type="text" placeholder="Full Name" required />
          )}

          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          {isSignup && (
            <input type="password" placeholder="Confirm Password" required />
          )}

          <button type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>

          <p className="switch-text">
            {isSignup ? "Already have an account?" : "New here?"}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? " Sign In" : " Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
