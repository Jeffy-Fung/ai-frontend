"use client";

import { DeepChat } from "deep-chat-react";
import SessionDrawer from "@/components/drawers";
import { getAuthToken } from "@/app/helpers/auth";

export default function Chatbot() {
  // TODO: get history from backend, with session id
  const history = [
    { role: "ai", text: "Hi, how can I help you today?" },
  ];

  // TODO: get sessions from backend
  const sessions = [
    {
      id: 'eklajldkscjweijfiowe_ealwej',
      date: '2025-01-31',
      action: () => {},
      current: true,
    },
  ]

  return (
    <>
      <div className="w-full h-full">
        <DeepChat
          connect={{
            url: `${process.env.NEXT_PUBLIC_NODEJS_BACKEND_API_URL}/api/chats`,
            method: "POST",
            headers: {"Authorization": `Bearer ${getAuthToken()}`},
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
          history={history}
        />
      </div>
      <SessionDrawer sessions={sessions} />
    </>
  );
}
