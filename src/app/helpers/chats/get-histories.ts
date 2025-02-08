import { ChatHistory } from "@/types/chat";

export const getHistories = (chatHistories: ChatHistory[] | undefined) => {
  if (chatHistories?.length && chatHistories.length > 0) {

    return chatHistories.map((history: ChatHistory) => ({
      role: history.role,
      text: history.message,
    }));
  }

  return [{ role: "ai", text: "Hi, how can I help you today?" }];
}
