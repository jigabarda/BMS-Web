"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { createBroadcast } from "@/app/lib/broadcasts";

interface FormData {
  title: string;
  message: string;
}

export default function NewBroadcastPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    title: "",
    message: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");

    try {
      await createBroadcast({ title: form.title, message: form.message });
      router.push("/broadcasts");
    } catch (err) {
      setError("Failed to create broadcast");
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">➕ Create Broadcast</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Broadcast Title"
            className="w-full border px-3 py-2 rounded-md"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            className="w-full border px-3 py-2 rounded-md"
            value={form.message}
            onChange={handleChange}
            rows={4}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-md"
          >
            Create
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
