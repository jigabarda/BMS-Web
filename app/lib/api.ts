// app/lib/api.ts
import axios, { AxiosInstance } from "axios";

const BASE_HOST = "http://localhost:3001"; // Rails server
const API_PREFIX = "/api/v1"; // Rails namespace for API endpoints

// LocalStorage keys
export const TOKEN_KEY = "token";
export const USER_KEY = "user";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
  message?: string;
}

export interface RegisterResponse {
  user: {
    id: number;
    email: string;
  };
  message?: string;
}

export interface Broadcast {
  id: number;
  title: string;
  message: string;
  status: string;
  sent_at?: string | null;
  created_at: string;
  updated_at?: string;
}

// axios client (base host)
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_HOST,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// LocalStorage helper wrappers (exported)
export function setSavedToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}
export function getSavedToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
export function clearSavedToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Attach JWT automatically to requests (client-side only)
apiClient.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore for SSR
  }
  return config;
});

// ---------------- AUTH ----------------
// Devise sign_in endpoint expects nested `user` param
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const payload = { user: { email, password } };
  const resp = await apiClient.post<LoginResponse>("/auth/sign_in", payload);
  return resp.data;
}

export async function registerUser(
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<RegisterResponse> {
  const payload = {
    user: {
      email,
      password,
      password_confirmation: passwordConfirmation,
    },
  };
  const resp = await apiClient.post<RegisterResponse>("/auth", payload);
  return resp.data;
}

// ---------------- BROADCASTS ----------------
const broadcastPath = (suffix = "") => `${API_PREFIX}/broadcasts${suffix}`;

export async function fetchBroadcasts(): Promise<Broadcast[]> {
  const resp = await apiClient.get<Broadcast[]>(broadcastPath());
  return resp.data;
}

export async function fetchBroadcast(id: number): Promise<Broadcast> {
  const resp = await apiClient.get<Broadcast>(broadcastPath(`/${id}`));
  return resp.data;
}

export interface CreateBroadcastDTO {
  title: string;
  message: string;
}

export async function createBroadcast(
  data: CreateBroadcastDTO
): Promise<Broadcast> {
  const resp = await apiClient.post<Broadcast>(broadcastPath(), {
    broadcast: data,
  });
  return resp.data;
}

export async function updateBroadcast(
  id: number,
  data: CreateBroadcastDTO
): Promise<Broadcast> {
  const resp = await apiClient.put<Broadcast>(broadcastPath(`/${id}`), {
    broadcast: data,
  });
  return resp.data;
}

export async function deleteBroadcast(id: number): Promise<void> {
  await apiClient.delete(broadcastPath(`/${id}`));
}

export interface SendBroadcastResult {
  status: string;
  pushed_to?: number;
}

export async function sendBroadcast(id: number): Promise<SendBroadcastResult> {
  const resp = await apiClient.post<SendBroadcastResult>(
    broadcastPath(`/${id}/send_broadcast`)
  );
  return resp.data;
}
