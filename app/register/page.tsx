// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !passwordConfirmation) {
      setError("All fields are required.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password, passwordConfirmation);
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to register. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create account</h1>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password confirmation"
          className="w-full border rounded p-2"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
