// app/dashboard/layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      const storedToken = localStorage.getItem("token");
      const auth = storedToken || token;

      if (!auth) {
        router.push("/login");
        return;
      }

      setReady(true); // now asynchronous → no warning
    });
  }, [router, token]);

  if (!ready) return null;

  return <div>{children}</div>;
}
