import ChatSessionContext from "./chatSessionProvider";

const chatContext = {
  sessionDrawerOpen: false,
  setSessionDrawerOpen: () => {},
}

const ChatSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatSessionContext.Provider value={chatContext}>
      {children}
    </ChatSessionContext.Provider>
  )
}

export default ChatSessionProvider;
