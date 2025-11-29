"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchBroadcast,
  sendBroadcast,
  deleteBroadcast,
} from "@/app/lib/broadcasts";
import { Broadcast } from "@/app/types/broadcast";

export default function BroadcastDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBroadcast(id);
        setBroadcast(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load broadcast");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleSend = async () => {
    setSending(true);
    try {
      const result = await sendBroadcast(id);
      alert(`Broadcast sent! Status: ${result.status}`);
    } catch (err) {
      console.error(err);
      alert("Failed to send broadcast");
    }
    setSending(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this broadcast?")) return;

    setDeleting(true);
    try {
      await deleteBroadcast(id);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete broadcast");
    }
    setDeleting(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!broadcast) return <div className="p-6">Broadcast not found.</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => router.push("/dashboard")}
        className="text-blue-600 underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">{broadcast.title}</h1>

      <div className="p-4 border rounded-xl bg-gray-50">
        <p className="whitespace-pre-wrap">{broadcast.message}</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          Status: <strong>{broadcast.status}</strong>
        </p>
        <p>Created: {new Date(broadcast.created_at).toLocaleString()}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSend}
          disabled={sending}
          className="bg-green-600 text-white px-4 py-2 rounded-xl disabled:bg-green-300"
        >
          {sending ? "Sending..." : "Send Broadcast"}
        </button>

        <button
          onClick={() => router.push(`/dashboard/${id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 text-white px-4 py-2 rounded-xl disabled:bg-red-300"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
