import ChatSessionContext from "./ChatSessionProvider";
import { useState } from "react";

const ChatSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionDrawerOpen, setSessionDrawerOpen] = useState(false);
  const [newsArticlesDrawerOpen, setNewsArticlesDrawerOpen] = useState(false);

  return (
    <ChatSessionContext.Provider value={{ sessionDrawerOpen, setSessionDrawerOpen, newsArticlesDrawerOpen, setNewsArticlesDrawerOpen }}>
      {children}
    </ChatSessionContext.Provider>
  )
}

export default ChatSessionProvider;
