"use client";

import { DeepChat } from "deep-chat-react";
import SessionDrawer from "@/components/drawers";
import { getAuthToken } from "@/app/helpers/auth";
import { useChatHistories } from "@/app/nodejs-backend/chat-histories/queries/useChatHistories";
import { useRagChatSessions } from "@/app/nodejs-backend/chat-histories/queries/useRagChatSessions";
import { ChatHistory, ChatSession } from "@/types/chat";
import { useState } from "react";
import { usePostRagChatSession } from '@/app/nodejs-backend/chat-histories/mutations/useRagChatSession';

const getHistories = (chatHistories: ChatHistory[] | undefined) => {
  if (chatHistories?.length && chatHistories.length > 0) {
    return chatHistories.map((history: ChatHistory) => ({
      role: history.role,
      text: history.message,
    }));
  }

  // Get initial template message from backend
  return [{ role: "ai", text: "Talk to the current news article." }];
}

export default function RagChatbot() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { data: chatSessions, isLoading: chatSessionsLoading } = useRagChatSessions();
  const { data: chatHistories, isLoading: chatHistoriesLoading } = useChatHistories(sessionId ?? "");
  const { mutate: postRagChatSession } = usePostRagChatSession();

  if (chatSessionsLoading || chatHistoriesLoading) return <div>Loading...</div>;

  const sessions = chatSessions.map((session: ChatSession) => ({
    id: session.id,
    date: session.createdAt,
    action: () => setSessionId(session.id),
    current: session.id === sessionId,
  }));

  const histories = getHistories(chatHistories);

  return (
    <>
      {sessionId ? renderChat(histories, sessionId) : renderFallbackMessage()}
      <SessionDrawer sessions={sessions} postChatSession={postRagChatSession} />
    </>
  );
}

const renderFallbackMessage = () => (
  <div className="flex justify-center items-center h-full">
    <div className="text-2xl font-bold">Select a session to start chatting</div>
  </div>
);

const renderChat = (histories: { role: string; text: string }[], sessionId: string) => (
  <div className="w-full h-full">
    <DeepChat
      connect={{
        url: `${process.env.NEXT_PUBLIC_NODEJS_BACKEND_API_URL}/api/chats/rag`,
        method: "POST",
        headers: { "Authorization": `Bearer ${getAuthToken()}` },
        additionalBodyProps: { "sessionId": sessionId }
      }}
      style={{
        borderRadius: "10px",
        width: "800px",
        height: "700px",
        paddingTop: "20px",
        paddingBottom: "20px"
      }}
      textInput={{
        placeholder: { text: "Welcome to the demo!" },
        styles: {
          container: {
            borderRadius: "10px",
            padding: "5px"
          }
        }
      }}
      history={histories}
    />
  </div>
);
