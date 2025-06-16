import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Replace these with your Supabase credentials
const supabase = createClient(
  "https://vfaopxxmpwmgqltypubd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYW9weHhtcHdtZ3FsdHlwdWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNTYyNTksImV4cCI6MjA2NTYzMjI1OX0.Ip62TEIjM26NaIu6fGWRRFpvBflNU0uia0l4d4S8qLg"
);

export default function NameStore() {
  const [name, setName] = useState("");
  const [verifyName, setVerifyName] = useState("");
  const [message, setMessage] = useState("");

  const saveName = async () => {
    if (!name) return;
    const { error } = await supabase.from("Login").insert([{ name }]);
    if (error) {
      setMessage("⚠️ Failed to save. Maybe duplicate?");
    } else {
      setMessage("✅ Name saved!");
      setName("");
    }
  };

  const verifyNameExists = async () => {
    const { data, error } = await supabase
      .from("Login")
      .select("name")
      .eq("name", verifyName);

    if (error) {
      setMessage("⚠️ Verification failed.");
    } else if (data.length > 0) {
      setMessage("✅ Name exists!");
    } else {
      setMessage("❌ Name not found.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 space-y-6 border rounded-xl shadow">
      <div>
        <h2 className="text-lg font-bold mb-2">Save Name</h2>
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter name to save"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={saveName}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Verify Name</h2>
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter name to verify"
          value={verifyName}
          onChange={(e) => setVerifyName(e.target.value)}
        />
        <button
          onClick={verifyNameExists}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
