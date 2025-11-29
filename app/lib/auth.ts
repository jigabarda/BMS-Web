// app/lib/auth.ts
import { getSavedToken, setSavedToken, clearSavedToken, USER_KEY } from "./api";

/**
 * Lightweight helpers for components
 */

export function isLoggedIn(): boolean {
  return !!getSavedToken();
}

export function saveToken(token: string) {
  setSavedToken(token);
}

export function removeToken() {
  clearSavedToken();
}

export function saveUserJson(userJson: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, userJson);
}
