import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/app/login/page";
import Home from "@/app/pages/Home";
import NewBroadcast from "@/app/pages/NewBroadcast";
import { useAuthStore } from "../store/authStore";
function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/broadcasts/new"
          element={
            <ProtectedRoute>
              <NewBroadcast />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
