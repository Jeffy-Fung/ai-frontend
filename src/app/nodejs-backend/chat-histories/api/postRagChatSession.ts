import { post } from "@/app/helpers/api";

export function postRagChatSession() {
  return post(`api/chat-sessions/rag`, {});
}
