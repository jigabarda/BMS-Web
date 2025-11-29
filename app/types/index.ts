export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface LoginResponse {
  status: number;
  token: string;
  user: User;
}

export interface Broadcast {
  id: number;
  title: string;
  message: string;
  created_at: string;
  status: string;
}

export interface CreateBroadcastPayload {
  title: string;
  message: string;
}
