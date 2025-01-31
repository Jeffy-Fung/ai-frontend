"use client";

import { DeepChat } from "deep-chat-react";

export default function Chatbot() {
  const history = [
    { role: "ai", text: "Hi, how can I help you today?" },
  ];

  return (
    <>
      <div className="w-full h-full">
        <DeepChat
          demo={true}
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
    </>
  );
}
