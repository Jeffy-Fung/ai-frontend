"use client";

import SessionDrawer from "@/components/session-drawers";
import { useChatHistories } from "@/app/nodejs-backend/chat-histories/queries/useChatHistories";
import { useSimpleChatSessions } from "@/app/nodejs-backend/chat-histories/queries/useSimpleChatSessions";
import { ChatSession } from "@/types/chat";
import { useState } from "react";
import { usePostSimpleChatSession } from "@/app/nodejs-backend/chat-histories/mutations/useSimpleChatSession";
import { getHistories } from "@/app/helpers/chats/get-histories";
import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import('@/components/chatbot'), {
  loading: () => <p>Loading...</p>,
})

export default function SimpleChatbot() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { data: chatSessions, isLoading: chatSessionsLoading } =
    useSimpleChatSessions();
  const { data: chatHistories, isLoading: chatHistoriesLoading } =
    useChatHistories(sessionId ?? "");
  const {
    mutate: postSimpleChatSession,
    isPending: postSimpleChatSessionLoading,
  } = usePostSimpleChatSession();

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
      {sessionId ? (
        <Chatbot
          histories={histories}
          sessionId={sessionId}
          path="/api/chats"
        />
      ) : (
        renderFallbackMessage()
      )}
      <SessionDrawer
        sessions={sessions}
        postChatSession={postSimpleChatSession}
        postChatSessionLoading={postSimpleChatSessionLoading}
      />
    </>
  );
}

const renderFallbackMessage = () => (
  <div className="flex justify-center items-center h-full">
    <div className="text-2xl font-bold">Choose or create a session on the left panel to start chatting</div>
  </div>
);
