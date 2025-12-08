// app/layout.tsx
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // ← ADD THIS LINE

import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import AuthProvider from "@/app/components/AuthProvider";

export const metadata: Metadata = {
  title: "Broadcast System",
  description: "Internal Broadcast Messaging Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <div className="content-container">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
