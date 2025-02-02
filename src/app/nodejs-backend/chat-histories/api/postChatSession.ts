import { post } from "@/app/helpers/api";

export function postChatSession() {
  return post(`api/chat-sessions`, {});
}
