"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchBroadcasts, sendBroadcast } from "@/app/lib/api";
import type { Broadcast } from "@/app/types/broadcast";

export default function DashboardPage() {
  const router = useRouter();
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loadingSend, setLoadingSend] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchBroadcasts();
    setBroadcasts(data);
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const data = await fetchBroadcasts();
      setBroadcasts(data);
      setLoading(false);
    };

    run();
  }, []);

  const handleSend = async (id: number) => {
    setLoadingSend(id);
    try {
      const result = await sendBroadcast(id);
      // Optionally show result details
      alert(
        `Broadcast sent — status: ${result.status} pushed_to: ${
          result.pushed_to ?? 0
        }`
      );
      await load();
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e: any = err;
      const message = e?.message || "Failed to send broadcast";
      // If serverResponse exists we can show server's error object
      if (e?.serverResponse) {
        console.error("Server response:", e.serverResponse);
      }
      alert(`Error sending broadcast: ${message}`);
    } finally {
      setLoadingSend(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📢 Broadcast Messages</h1>

        <button
          onClick={() => router.push("/broadcasts/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ New Broadcast
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {broadcasts.map((b) => (
            <div
              key={b.id}
              className="border rounded-xl p-4 shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{b.title}</h2>
                <p className="text-gray-600">{b.message}</p>

                <p className="text-xs text-gray-400 mt-3">
                  Created: {new Date(b.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/dashboard/${b.id}`}
                  className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
                >
                  View
                </Link>

                <Link
                  href={`/dashboard/${b.id}/edit`}
                  className="px-3 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleSend(b.id)}
                  disabled={loadingSend === b.id}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loadingSend === b.id ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
