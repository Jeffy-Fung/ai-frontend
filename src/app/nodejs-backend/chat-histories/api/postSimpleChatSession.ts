import { post } from "@/app/helpers/api";

export function postSimpleChatSession() {
  return post(`api/chat-sessions/simple`, {});
}
