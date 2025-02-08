import { createContext } from "react";

const ChatSessionContext = createContext({
  sessionDrawerOpen: true,
  setSessionDrawerOpen: (open: boolean) => {},
  newsArticlesDrawerOpen: true,
  setNewsArticlesDrawerOpen: (open: boolean) => {},
});

export default ChatSessionContext;
