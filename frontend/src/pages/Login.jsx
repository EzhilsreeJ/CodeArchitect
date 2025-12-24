import { useState, useEffect } from "react";
import CuteLamp from "../components/CuteLamp";
import "./login.css";

const USERS_KEY = "codearchitect_users";

export default function Login({ onLogin }) {
  const [lampOn, setLampOn] = useState(false);
  const [mode, setMode] = useState("login"); // login | signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check if user exists → decide mode
  useEffect(() => {
    if (!username) return;

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    setMode(users[username] ? "login" : "signup");
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");

    // ───────── LOGIN ─────────
    if (mode === "login") {
      if (!users[username]) {
        setError("User not found. Please sign up.");
        return;
      }

      if (users[username].password !== password) {
        setError("Invalid password");
        return;
      }

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("currentUser", username);
      onLogin();
    }

    // ───────── SIGN UP ─────────
    if (mode === "signup") {
      users[username] = {
        password,
        createdAt: Date.now(),
      };

      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("currentUser", username);
      onLogin();
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">CODEARCHITECT</h1>

      {/* Lamp */}
      <div className="lamp-wrapper">
        <CuteLamp lampOn={lampOn} onToggle={setLampOn} />
      </div>

      {/* Floating Auth Box */}
      <div className={`login-float ${lampOn ? "show" : ""}`}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="auth-error">{error}</div>}

          <button>
            {mode === "login" ? "Login" : "Create Account"}
          </button>

          <div className="auth-hint">
            {mode === "login"
              ? "Existing user detected"
              : "New user — account will be created"}
          </div>
        </form>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import CuteLamp from "../components/CuteLamp";
// import "./login.css";

// export default function Login({ onLogin }) {
//   const [lampOn, setLampOn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [statusMsg, setStatusMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatusMsg("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login-or-signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setStatusMsg(
//         data.status === "signup"
//           ? "Account created successfully 🎉"
//           : "Login successful ✅"
//       );

//       setTimeout(() => onLogin(), 800);
//     } catch (err) {
//       setStatusMsg(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <h1 className="login-title">CODEARCHITECT</h1>

//       <div className="lamp-wrapper">
//         <CuteLamp lampOn={lampOn} onToggle={setLampOn} />
//       </div>

//       <div className={`login-float ${lampOn ? "show" : ""}`}>
//         <form className="login-form" onSubmit={handleSubmit}>
//           <h2>Login</h2>

//           <input
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button disabled={loading}>
//             {loading ? "Please wait..." : "Continue"}
//           </button>

//           <p className="auth-switch">
//             Already have an account? <span>Sign up</span>
//           </p>

//           {statusMsg && <p className="status-msg">{statusMsg}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }
