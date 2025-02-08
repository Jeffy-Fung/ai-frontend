"use client";

import SessionDrawer from "@/components/drawers";
import { useChatHistories } from "@/app/nodejs-backend/chat-histories/queries/useChatHistories";
import { useRagChatSessions } from "@/app/nodejs-backend/chat-histories/queries/useRagChatSessions";
import { ChatSession } from "@/types/chat";
import { useState } from "react";
import { usePostRagChatSession } from '@/app/nodejs-backend/chat-histories/mutations/useRagChatSession';
import { getHistories } from "@/app/helpers/chats/get-histories";
import Chatbot from "@/components/chatbot";


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
      {sessionId ? <Chatbot histories={histories} sessionId={sessionId} path="/api/chats/rag" /> : renderFallbackMessage()}
      <SessionDrawer sessions={sessions} postChatSession={postRagChatSession} />
    </>
  );
}

const renderFallbackMessage = () => (
  <div className="flex justify-center items-center h-full">
    <div className="text-2xl font-bold">Select a session to start chatting</div>
  </div>
);
