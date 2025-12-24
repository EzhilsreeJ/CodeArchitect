import { useState, useEffect } from "react";
import Login from "./pages/Login";
import App from "./App"; // 👈 your existing App.jsx

export default function AppWrapper() {
  const [isAuth, setIsAuth] = useState(false);

  // Optional: persist login
  useEffect(() => {
    const saved = localStorage.getItem("isAuth");
    if (saved === "true") setIsAuth(true);
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  return isAuth ? <App /> : <Login onLogin={handleLogin} />;
}
