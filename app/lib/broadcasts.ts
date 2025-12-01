// app/lib/broadcasts.ts
import { apiClient, Broadcast } from "@/app/lib/api";

export interface CreateBroadcastDTO {
  title: string;
  message: string;
}

const BASE = "/api/v1";

// Fetch all broadcasts (GET /api/v1/broadcasts)
export async function fetchBroadcasts(): Promise<Broadcast[]> {
  const resp = await apiClient.get<Broadcast[]>(`${BASE}/broadcasts`);
  return resp.data;
}

// Fetch single broadcast (GET /api/v1/broadcasts/:id)
export async function fetchBroadcast(id: number): Promise<Broadcast> {
  const resp = await apiClient.get<Broadcast>(`${BASE}/broadcasts/${id}`);
  return resp.data;
}

// Create broadcast (POST /api/v1/broadcasts)
export async function createBroadcast(
  data: CreateBroadcastDTO
): Promise<Broadcast> {
  const resp = await apiClient.post<Broadcast>(`${BASE}/broadcasts`, {
    broadcast: { title: data.title, message: data.message },
  });
  return resp.data;
}

// Send broadcast (POST /api/v1/broadcasts/:id/send_broadcast)
// This now returns server JSON on error (throws) so callers can show the reason.
export async function sendBroadcast(
  id: number
): Promise<{ status: string; pushed_to?: number }> {
  try {
    const resp = await apiClient.post<{ status: string; pushed_to?: number }>(
      `${BASE}/broadcasts/${id}/send_broadcast`
    );
    return resp.data;
  } catch (err: unknown) {
    // Improve error details:
    // axios error has response?.data which usually contains { error: "..." }
    // We'll throw an Error with that message so UI shows it.
    // Type narrowing:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e: any = err;
    const serverMessage =
      e?.response?.data?.error ||
      e?.response?.data?.message ||
      e?.message ||
      "Request failed";
    const status = e?.response?.status;
    const out = new Error(`Server ${status ?? ""} — ${String(serverMessage)}`);
    // attach details for debugging
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (out as any).serverResponse = e?.response?.data;
    throw out;
  }
}

// Update broadcast (PUT /api/v1/broadcasts/:id)
export async function updateBroadcast(
  id: number,
  data: CreateBroadcastDTO
): Promise<Broadcast> {
  const resp = await apiClient.put<Broadcast>(`${BASE}/broadcasts/${id}`, {
    broadcast: { title: data.title, message: data.message },
  });
  return resp.data;
}

// Delete broadcast (DELETE /api/v1/broadcasts/:id)
export async function deleteBroadcast(id: number): Promise<void> {
  await apiClient.delete(`${BASE}/broadcasts/${id}`);
}
