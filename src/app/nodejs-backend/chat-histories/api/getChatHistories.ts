import { get } from "@/app/helpers/api";

export function getChatHistories(sessionId: string) {
  return get(`api/chat-histories`, { session_id: sessionId });
}
