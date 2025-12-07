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
    <nav className="bg-gray-100 p-3 flex items-center relative">
      {/* LEFT — LOGO */}
      <div className="mr-6">
        <Link href="/" className="text-xl font-bold text-blue-700">
          BMS 🛰️
        </Link>
      </div>

      {/* CENTER — NAV LINKS */}
      <div className="absolute left-1/2 font-semibold -translate-x-1/2 flex space-x-6">
        <Link href="/" className="text-blue-700 hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="text-blue-700 hover:underline">
          Dashboard
        </Link>
        <Link href="/analytics" className="text-blue-700 hover:underline">
          Analytics
        </Link>
        <Link href="/reports" className="text-blue-700 hover:underline">
          Reports
        </Link>
        <Link href="/content" className="text-blue-700 hover:underline">
          Content
        </Link>
      </div>

      {/* RIGHT — ACCOUNT INFO */}
      <div className="ml-auto flex items-center space-x-3">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
