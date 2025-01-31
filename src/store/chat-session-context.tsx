import ChatSessionContext from "./chatSessionProvider";
import { useState } from "react";

const ChatSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionDrawerOpen, setSessionDrawerOpen] = useState(false);

  return (
    <ChatSessionContext.Provider value={{ sessionDrawerOpen, setSessionDrawerOpen }}>
      {children}
    </ChatSessionContext.Provider>
  )
}

export default ChatSessionProvider;
