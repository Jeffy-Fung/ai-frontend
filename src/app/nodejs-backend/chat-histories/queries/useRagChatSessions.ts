import { useQuery } from "@tanstack/react-query";
import { getChatSessions } from "../api/getChatSessions";

export function useRagChatSessions() {
  return useQuery({
    queryKey: ["rag-chat-sessions"],
    queryFn: () => getChatSessions("rag"),
  });
}
