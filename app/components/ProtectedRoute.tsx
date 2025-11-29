// app/components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

/**
 * Very small client-side guard.
 * If no user/token found, redirect to /login.
 *
 * Usage: wrap pages that must be protected:
 * <ProtectedRoute> ...content... </ProtectedRoute>
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    // prefer Zustand state; fallback to localStorage token check
    if (!user && !token) {
      const t =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!t) {
        router.push("/login");
      }
    }
  }, [user, token, router]);

  return <>{children}</>;
}
