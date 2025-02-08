"use client";

import { DeepChat } from "deep-chat-react";
import SessionDrawer from "@/components/drawers";
import { getAuthToken } from "@/app/helpers/auth";
import { useChatHistories } from "@/app/nodejs-backend/chat-histories/queries/useChatHistories";
import { useSimpleChatSessions } from "@/app/nodejs-backend/chat-histories/queries/useSimpleChatSessions";
import { ChatSession } from "@/types/chat";
import { useState } from "react";
import { usePostSimpleChatSession } from '@/app/nodejs-backend/chat-histories/mutations/useSimpleChatSession';
import { getHistories } from "@/app/helpers/chats/get-histories";


export default function Chatbot() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { data: chatSessions, isLoading: chatSessionsLoading } = useSimpleChatSessions();
  const { data: chatHistories, isLoading: chatHistoriesLoading } = useChatHistories(sessionId ?? "");
  const { mutate: postSimpleChatSession } = usePostSimpleChatSession();

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
      <SessionDrawer sessions={sessions} postChatSession={postSimpleChatSession} />
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
        url: `${process.env.NEXT_PUBLIC_NODEJS_BACKEND_API_URL}/api/chats`,
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
