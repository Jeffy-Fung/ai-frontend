import { useMutation } from "@tanstack/react-query";
import { postRagChatSession } from "../api/postRagChatSession";
import { useQueryClient } from "@tanstack/react-query";


export function usePostRagChatSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRagChatSession,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["rag-chat-sessions"] });
    },
  });

}
