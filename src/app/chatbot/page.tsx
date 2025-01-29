"use client";

import { DeepChat } from "deep-chat-react";

export default function Chatbot() {
  const history = [
    { role: "user", text: "Hey, how are you today?" },
    { role: "ai", text: "I am doing very well!" },
  ];

  return (
    <>
      <div className="">
        <h1>Deep Chat</h1>
        <DeepChat
          demo={true}
          style={{ borderRadius: "10px" }}
          textInput={{ placeholder: { text: "Welcome to the demo!" } }}
          history={history}
        />
      </div>
    </>
  );
}
