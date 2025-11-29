// app/types/broadcast.ts
export interface Broadcast {
  id: number;
  title: string;
  message: string;
  status?: string | null;
  sent_at?: string | null;
  user_id?: number;
  created_at: string;
  updated_at?: string;
}
