"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchBroadcast, updateBroadcast } from "@/app/lib/broadcasts";
import type { Broadcast } from "@/app/types/broadcast";

export default function EditBroadcastPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBroadcast(id);
        setBroadcast(data);
        setTitle(data.title);
        setMessage(data.message);
      } catch (err) {
        console.error(err);
        alert("Unable to load broadcast.");
      }
      setLoading(false);
    }

    load();
  }, [id]);

  const saveChanges = async () => {
    if (!title.trim()) return alert("Title is required.");
    if (!message.trim()) return alert("Message is required.");

    setSaving(true);

    try {
      await updateBroadcast(id, { title, message });
      router.push(`/dashboard/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update broadcast.");
    }

    setSaving(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!broadcast)
    return <div className="p-6 text-red-500">Broadcast not found.</div>;

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <button
        onClick={() => router.push(`/dashboard/${id}`)}
        className="text-blue-600 underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold">Edit Broadcast</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Message"
          className="w-full p-3 border rounded-lg h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={saveChanges}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-blue-300"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => router.push(`/dashboard/${id}`)}
          className="text-gray-700 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
