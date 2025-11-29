// app/dashboard/layout.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return <div>{children}</div>;
}
