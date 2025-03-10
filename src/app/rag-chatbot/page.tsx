"use client";

import SessionDrawer from "@/components/session-drawers";
import { useChatHistories } from "@/app/nodejs-backend/chat-histories/queries/useChatHistories";
import { useRagChatSessions } from "@/app/nodejs-backend/chat-histories/queries/useRagChatSessions";
import { ChatSession } from "@/types/chat";
import { useState } from "react";
import { usePostRagChatSession } from "@/app/nodejs-backend/chat-histories/mutations/useRagChatSession";
import { getHistories } from "@/app/helpers/chats/get-histories";
import NewsArticlesDrawers from "@/components/news-articles-drawers";
import { useTrendingNewsArticles } from "../nodejs-backend/news-articles/queries/useTrendingNewsArticles";
import { NewsArticle } from "@/types/news-articles";
import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import('@/components/chatbot'), {
  loading: () => <p>Loading...</p>,
})

export default function RagChatbot() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [newsArticleIds, setNewsArticleIds] = useState<string[]>([]);

  const { data: chatSessions, isLoading: chatSessionsLoading } =
    useRagChatSessions();
  const { data: chatHistories, isLoading: chatHistoriesLoading } =
    useChatHistories(sessionId ?? "");
  const { mutate: postRagChatSession, isPending: postRagChatSessionLoading } =
    usePostRagChatSession();

  const { data: newsArticlesData, isLoading: newsArticlesLoading } =
    useTrendingNewsArticles();

  if (chatSessionsLoading || chatHistoriesLoading || newsArticlesLoading)
    return <div>Loading...</div>;

  const sessions = chatSessions.map((session: ChatSession) => ({
    id: session.id,
    date: session.createdAt,
    action: () => setSessionId(session.id),
    current: session.id === sessionId,
  }));

  const newsArticles = newsArticlesData.map((newsArticle: NewsArticle) => ({
    id: newsArticle.id,
    title: newsArticle.title,
    description: newsArticle.description,
    publishedAt: newsArticle.publishedAt,
    action: () => {
      setNewsArticleIds((prevIds) =>
        prevIds.includes(newsArticle.id)
          ? prevIds.filter((id) => id !== newsArticle.id)
          : [...prevIds, newsArticle.id]
      );
    },
    current: newsArticleIds.includes(newsArticle.id),
  }));

  const histories = getHistories(chatHistories);

  return (
    <>
      {sessionId ? (
        <Chatbot
          histories={histories}
          sessionId={sessionId}
          path="/api/chats/rag"
          additionalBodyProps={{ newsArticleIds: newsArticleIds }}
          key={JSON.stringify(newsArticleIds)}
        />
      ) : (
        renderFallbackMessage()
      )}
      <SessionDrawer
        sessions={sessions}
        postChatSession={postRagChatSession}
        postChatSessionLoading={postRagChatSessionLoading}
      />
      <NewsArticlesDrawers newsArticles={newsArticles} />
    </>
  );
}

const renderFallbackMessage = () => (
  <div className="flex justify-center items-center h-full">
    <div className="text-2xl font-bold">1. Choose or create a session from the left panel</div>
    <br />
    <div className="text-2xl font-bold">2. Select news articles from the left panel you wish to talk about</div>
  </div>
);
