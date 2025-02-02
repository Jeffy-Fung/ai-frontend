import { useMutation } from "@tanstack/react-query";
import { postChatSession } from "../api/postChatSession";

export function usePostChatSession() {
  return useMutation({
    mutationFn: postChatSession,
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
