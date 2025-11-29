// app/components/AuthProvider.tsx
"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        setAuth(user, token);
      } catch {
        // cleanup on parse error
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
