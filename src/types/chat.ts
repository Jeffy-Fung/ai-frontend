type ChatRole = "user" | "ai";

export type ChatHistory = {
  id: string;
  sessionid: string;
  role: ChatRole;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export type ChatSession = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  type: ChatSessionType;
}

export type ChatSessionType = "simple" | "rag";
