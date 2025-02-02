export type ChatHistory = {
  id: string;
  session_id: string;
  role: string;
  message: string;
}

export type ChatSession = {
  id: string;
  created_at: string;
  user_id: string;
}


