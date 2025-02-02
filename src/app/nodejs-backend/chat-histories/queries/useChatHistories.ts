import { useQuery } from "@tanstack/react-query";
import { getChatHistories } from "../api/getChatHistories";

export function useChatHistories(sessionId: string) {
  return useQuery({
    queryKey: ["chat-histories", sessionId],
    queryFn: () => getChatHistories(sessionId),
  });
}
