// app/page.tsx
"use client";

import { useAuthStore } from "@/app/store/authStore";
import { fetchBroadcasts } from "@/app/lib/api";
import { Broadcast } from "@/app/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;

    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const list = await fetchBroadcasts();
        if (mounted) setBroadcasts(list);
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Please log in</h2>
        <p className="mb-4">You must be signed in to view broadcasts.</p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* LEFT SECTION — TEXT + BROADCAST LIST */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Broadcasts</h2>

          <Link
            href="/broadcasts/create"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Broadcast
          </Link>
        </div>

        {loading ? (
          <p>Loading broadcasts…</p>
        ) : broadcasts.length === 0 ? (
          <p className="text-gray-500">No broadcasts yet.</p>
        ) : (
          <ul className="space-y-4">
            {broadcasts.map((b) => (
              <li
                key={b.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-lg">{b.title}</h3>
                  <p className="text-gray-700 mt-1">{b.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(b.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-gray-600">
                    Status: {b.status}
                  </span>
                  <Link
                    href={`/dashboard/${b.id}`}
                    className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT SECTION — IMAGE */}
      <div className="flex justify-center md:justify-end">
        <Image
          src="/image3.png"
          width={450}
          height={450}
          alt="Broadcast System Illustration"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
