import { get } from "@/app/helpers/api";

export function getChatHistories(sessionId: string) {
  return get(`api/chat-sessions/${sessionId}/chat-histories`, null);
}
