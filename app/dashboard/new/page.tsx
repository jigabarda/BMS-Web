"use client";

import { useState } from "react";
import { createBroadcast } from "@/app/lib/broadcasts";
import { useRouter } from "next/navigation";

export default function NewBroadcastPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    setError("");
    setSuccess("");

    if (!title || !message) {
      setError("Title and message are required.");
      return;
    }

    try {
      setLoading(true);

      await createBroadcast({ title, message });

      setSuccess("Broadcast created!");
      setTitle("");
      setMessage("");

      setTimeout(() => router.push("/dashboard"), 800);
    } catch {
      setError("Failed to create broadcast.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Create Broadcast</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <input
        type="text"
        placeholder="Title"
        className="w-full mb-4 p-3 border rounded-xl text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <textarea
        placeholder="Message"
        className="w-full mb-4 p-3 border rounded-xl h-32 text-black"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-700 text-white p-3 rounded-xl w-full hover:bg-blue-800 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Broadcast"}
      </button>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-4 w-full border border-gray-500 p-3 rounded-xl hover:bg-gray-100"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
