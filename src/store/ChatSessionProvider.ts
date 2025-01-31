import { createContext } from "react";

const ChatSessionContext = createContext({
  sessionDrawerOpen: true,
  setSessionDrawerOpen: (open: boolean) => {},
});

export default ChatSessionContext;
