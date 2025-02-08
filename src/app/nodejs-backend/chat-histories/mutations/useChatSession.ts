import { useMutation } from "@tanstack/react-query";
import { postSimpleChatSession } from "../api/postChatSession";
import { useQueryClient } from "@tanstack/react-query";

export function usePostSimpleChatSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSimpleChatSession,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["simple-chat-sessions"] });
    },
  });
}
