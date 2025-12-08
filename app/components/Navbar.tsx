"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const pathname = usePathname(); // detect current path

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Analytics", href: "/analytics" },
    { name: "Reports", href: "/reports" },
    { name: "Content", href: "/content" },
  ];

  return (
    <nav className="bg-[#061026] shadow-white p-3 flex items-center relative">
      {/* LEFT — LOGO */}
      <div className="mr-6">
        <Link href="/" className="text-xl font-bold text-blue-700">
          BMS 🛰️
        </Link>
      </div>

      {/* CENTER — NAV LINKS */}
      <div className="absolute left-1/2 font-semibold -translate-x-1/2 flex space-x-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <div key={link.href} className="flex flex-col items-center">
              <Link
                href={link.href}
                className={`${
                  isActive ? "text-blue-700" : "text-white hover:text-blue-700"
                }`}
              >
                {link.name}
              </Link>
              {isActive && (
                <span className="block w-8 h-1 bg-blue-700 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT — ACCOUNT INFO */}
      <div className="ml-auto flex items-center space-x-3">
        {user ? (
          <>
            <span className="text-white">Hi, {user.email}</span>
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
