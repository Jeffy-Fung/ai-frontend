export type ChatHistory = {
  _id: string;
  session_id: string;
  role: string;
  message: string;
}

export type ChatSession = {
  _id: string;
  createdAt: string;
  user: string; // TODO: change to user id
}


