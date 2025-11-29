"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBroadcasts, deleteBroadcast } from "@/app/lib/broadcasts";
import type { Broadcast } from "@/app/types/broadcast";

export default function DeleteBroadcastPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const list = await fetchBroadcasts();
      const found = list.find((b: Broadcast) => b.id === id) || null;

      setBroadcast(found);
      setLoading(false);
    };

    load();
  }, [id]);

  const remove = async () => {
    setDeleting(true);

    await deleteBroadcast(id);

    router.push("/dashboard");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!broadcast) return <div className="p-6 text-red-600">Not found</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Delete Broadcast</h1>

      <div className="border p-4 rounded-lg bg-white shadow">
        <h2 className="font-semibold">{broadcast.title}</h2>
        <p className="text-gray-700">{broadcast.message}</p>
      </div>

      <p className="mt-6 text-gray-600">
        Are you sure you want to delete this broadcast? This action cannot be
        undone.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={remove}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Yes, Delete"}
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
