"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { fetchBroadcasts, sendBroadcast } from "@/app/lib/broadcasts";
import { Broadcast } from "@/app/types/broadcast";

export default function BroadcastsPage() {
  const router = useRouter();
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const data = await fetchBroadcasts();
      setBroadcasts(data);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📢 Broadcasts</h1>

          <button
            onClick={() => router.push("/broadcasts/new")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            ➕ New Broadcast
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : broadcasts.length === 0 ? (
          <p className="text-gray-500">No broadcasts yet.</p>
        ) : (
          <ul className="space-y-4">
            {broadcasts.map((b) => (
              <li
                key={b.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{b.title}</h2>
                  <p className="text-gray-600 text-sm">{b.message}</p>
                  <p className="text-xs mt-1">Status: {b.status}</p>
                </div>

                {b.status !== "sent" && (
                  <button
                    onClick={() =>
                      sendBroadcast(b.id).then(() => {
                        // refresh list
                        const refresh = async () => {
                          setLoading(true);
                          const data = await fetchBroadcasts();
                          setBroadcasts(data);
                          setLoading(false);
                        };
                        refresh();
                      })
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    Send
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
