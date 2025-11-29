"use client";

import { useEffect, useState } from "react";
import { getBroadcasts, Broadcast } from "@/app/lib/api";
import BroadcastCard from "@/app/components/BroadcastCard";
import Link from "next/link";

export default function Home() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);

  useEffect(() => {
    getBroadcasts().then(setBroadcasts);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Broadcasts</h2>
      <Link href="/broadcasts/new">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
          Create New Broadcast
        </button>
      </Link>
      <div className="mt-5">
        {broadcasts.length === 0 ? (
          <p className="text-gray-500">No broadcasts yet.</p>
        ) : (
          broadcasts.map((b) => <BroadcastCard key={b.id} broadcast={b} />)
        )}
      </div>
    </div>
  );
}
