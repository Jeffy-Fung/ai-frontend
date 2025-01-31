import { createContext } from "react";

const ChatSessionContext = createContext({
  sessionDrawerOpen: false,
  setSessionDrawerOpen: () => {},
});

export default ChatSessionContext;
