import { get } from "@/app/helpers/api";
import { ChatSessionType } from "@/types/chat";

export function getChatSessions(type: ChatSessionType) {
  return get(`api/chat-sessions`, { type });
}
