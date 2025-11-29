"use client";

import { useState } from "react";
import { createBroadcast } from "@/app/lib/broadcasts";
import { useRouter } from "next/navigation";

export default function CreateBroadcastPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title.trim() || !message.trim()) {
      return alert("Please fill out all fields.");
    }

    setLoading(true);

    try {
      await createBroadcast({ title, message });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create broadcast");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <button
        onClick={() => router.push("/dashboard")}
        className="text-blue-600 underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Create New Broadcast</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full mb-4 p-3 border rounded-xl"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Message"
        className="w-full mb-4 p-3 border rounded-xl h-32"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-700 text-white p-3 rounded-xl w-full disabled:bg-blue-400"
      >
        {loading ? "Creating..." : "Create Broadcast"}
      </button>
    </div>
  );
}
