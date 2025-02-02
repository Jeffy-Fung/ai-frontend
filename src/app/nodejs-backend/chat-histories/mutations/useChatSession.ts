import { useMutation } from "@tanstack/react-query";
import { postChatSession } from "../api/postChatSession";
import { useQueryClient } from "@tanstack/react-query";

export function usePostChatSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postChatSession,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["chat-sessions"] });
    },
  });
}
