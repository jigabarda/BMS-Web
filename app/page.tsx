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
      <div className="min-h-screen flex items-center justify-center bg-[#0b1a3b] p-6">
        <div className="max-w-md w-full bg-gray-800 text-white rounded-lg shadow p-6">
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
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061026] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 mt-3 gap-10 items-start">
        {/* LEFT SECTION — TEXT + BROADCAST LIST */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Streamlining Communication with Smart Broadcast Management
          </h1>

          <p className="text-gray-300 mt-4">
            Get quick control over all your announcements. Create, schedule, and
            review broadcasts from one simple dashboard. Track delivery status
            in real time and keep your team informed effortlessly.
          </p>

          {/* Feature list with outline check icons */}
          <p className="mt-5 space-y-2">
            <span className="flex items-center gap-2 text-gray-300">
              <i className="fa-regular fa-circle-check text-blue-400 text-lg"></i>
              Easy message creation
            </span>
            <span className="flex items-center gap-2 text-gray-300">
              <i className="fa-regular fa-circle-check text-blue-400 text-lg"></i>
              Real-time status tracking
            </span>
            <span className="flex items-center gap-2 text-gray-300">
              <i className="fa-regular fa-circle-check text-blue-400 text-lg"></i>
              Centralized view of all broadcasts
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4">
            {/* Primary Button */}
            <Link
              href="/broadcasts/create"
              className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Create Broadcast
            </Link>

            {/* Secondary Button */}
            <Link
              href="/dashboard"
              className="px-8 py-2 border border-blue-600 text-blue-400 font-semibold rounded-lg shadow hover:bg-blue-900 transition"
            >
              View Dashboard
            </Link>
          </div>

          <div className="flex items-center mb-3 justify-between mt-12">
            <h2 className="text-xl font-semibold">Recent Broadcasts</h2>
          </div>

          {loading ? (
            <p>Loading broadcasts…</p>
          ) : broadcasts.length === 0 ? (
            <p className="text-gray-400">No broadcasts yet.</p>
          ) : (
            <ul className="space-y-4">
              {broadcasts.map((b) => (
                <li
                  key={b.id}
                  className="p-4 bg-gray-800 rounded-lg shadow-md flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {b.title}
                    </h3>
                    <p className="text-gray-300 mt-1">{b.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(b.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm text-gray-400">
                      Status: {b.status}
                    </span>
                    <Link
                      href={`/dashboard/${b.id}`}
                      className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600"
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
            width={550}
            height={550}
            alt="Broadcast System Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
