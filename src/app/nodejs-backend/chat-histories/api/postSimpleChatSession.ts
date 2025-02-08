import { post } from "@/app/helpers/api";

export function postSimpleChatSession() {
  return post(`api/simple-chat-sessions`, {});
}
