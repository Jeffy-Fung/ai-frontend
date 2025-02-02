import { useQuery } from "@tanstack/react-query";
import { getChatSessions } from "../api/getChatSessions";

export function useChatSessions() {
  return useQuery({
    queryKey: ["chat-sessions"],
    queryFn: getChatSessions,
  });
}
