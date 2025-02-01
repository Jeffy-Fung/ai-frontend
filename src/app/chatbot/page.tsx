"use client";

import { DeepChat } from "deep-chat-react";
import SessionDrawer from "@/components/drawers";

export default function Chatbot() {
  const history = [
    { role: "ai", text: "Hi, how can I help you today?" },
  ];

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
            headers: {"customName": "customHeaderValue"}, // TODO: add session header
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
