import { useQuery } from "@tanstack/react-query";
import { getChatSessions } from "../api/getChatSessions";

export function useSimpleChatSessions() {
  return useQuery({
    queryKey: ["simple-chat-sessions"],
    queryFn: () => getChatSessions("simple"),
  });
}
