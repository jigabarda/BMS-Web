// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-100 p-3 flex items-center space-x-4">
      <Link href="/" className="text-blue-700 hover:underline">
        Home
      </Link>

      <Link href="/dashboard" className="text-blue-700 hover:underline">
        Dashboard
      </Link>

      <Link href="/broadcasts/create" className="text-blue-700 hover:underline">
        Create Broadcast
      </Link>

      <div className="flex-1" />

      {user ? (
        <>
          <span className="text-gray-700">Hi, {user.email}</span>
          <button
            onClick={handleLogout}
            className="ml-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="ml-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="ml-3 px-3 py-1 border rounded hover:bg-gray-100"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
