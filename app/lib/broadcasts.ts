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
    title: data.title,
    message: data.message,
  });
  return resp.data;
}

// Send broadcast (POST /api/v1/broadcasts/:id/send)
export async function sendBroadcast(
  id: number
): Promise<{ status: string; pushed_to?: number }> {
  const resp = await apiClient.post<{ status: string; pushed_to?: number }>(
    `${BASE}/broadcasts/${id}/send`
  );
  return resp.data;
}

// Update broadcast (PUT /api/v1/broadcasts/:id)
export async function updateBroadcast(
  id: number,
  data: CreateBroadcastDTO
): Promise<Broadcast> {
  const resp = await apiClient.put<Broadcast>(`${BASE}/broadcasts/${id}`, {
    title: data.title,
    message: data.message,
  });
  return resp.data;
}

// Delete broadcast (DELETE /api/v1/broadcasts/:id)
export async function deleteBroadcast(id: number): Promise<void> {
  await apiClient.delete(`${BASE}/broadcasts/${id}`);
}
