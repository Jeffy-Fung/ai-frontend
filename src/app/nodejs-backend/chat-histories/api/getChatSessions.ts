import { get } from "@/app/helpers/api";

export function getChatSessions() {
  return get(`api/chat-sessions`, null);
}
