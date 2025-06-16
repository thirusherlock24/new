import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vfaopxxmpwmgqltypubd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYW9weHhtcHdtZ3FsdHlwdWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTYyNTksImV4cCI6MjA2NTYzMjI1OX0.Ip62TEIjM26NaIu6fGWRRFpvBflNU0uia0l4d4S8qLg"
);

export default function AuthForm() {
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
    } else {
      setMessage("❌ Invalid credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 space-y-6 border rounded-xl shadow bg-white">
      <h1 className="text-3xl font-bold text-brandblue  border rounded-xl">
        Hello Tailwind
      </h1>

      <h2 className="text-2xl font-bold text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      {isLogin ? (
        <>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Email or Username"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Login
          </button>
        </>
      ) : (
        <>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label>I accept the terms and privacy policy</label>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 underline">Terms</button>
            <button className="text-blue-600 underline">Privacy</button>
          </div>
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Sign Up
          </button>
        </>
      )}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-gray-600 underline mt-4"
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>

      {message && (
        <div className="text-center text-sm text-red-600">{message}</div>
      )}
    </div>
  );
}
