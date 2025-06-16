import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./AuthForm.css"; // 👈 import CSS here
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function AuthForm() {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!acceptTerms) {
      setMessage("⚠️ Please accept the terms and conditions.");
      return;
    }
    if (!email || !username || !password) {
      setMessage("⚠️ All fields are required.");
      return;
    }
    const { error } = await supabase
      .from("Login")
      .insert([{ email, username, password }]);
    setMessage(error ? "❌ Signup failed." : "✅ Signup successful!");
  };

  const handleLogin = async () => {
    if (!loginId || !loginPassword) {
      setMessage("⚠️ Enter login ID and password.");
      return;
    }
    const { data, error } = await supabase
      .from("Login")
      .select("*")
      .or(`email.eq.${loginId},username.eq.${loginId}`)
      .eq("password", loginPassword);

    if (error) {
      setMessage("❌ Login error.");
    } else if (data.length > 0) {
      setMessage("✅ Login successful!");
          navigate("/home"); // 👈 Navigate to HomePage
    } else {
      setMessage("❌ Invalid credentials.");
    }
  };

  return (
    <div className="auth-form">
      <h2 className="subtitle">{isLogin ? "Login" : "Sign Up"}</h2>

      {isLogin ? (
        <>
          <input
            className="input"
            placeholder="Email or Username"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="btn login-btn">
            Login
          </button>
        </>
      ) : (
        <>
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label>I accept to recieve RCS messages</label>
          </div>
          <div className="link-buttons">
            <button className="link">Terms</button>
            <button className="link">Privacy</button>
          </div>
          <button onClick={handleSignup} className="btn signup-btn">
            Sign Up
          </button>
        </>
      )}

      <button onClick={() => setIsLogin(!isLogin)} className="toggle-form">
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>

      {message && <div className="message">{message}</div>}
    </div>
  );
}
