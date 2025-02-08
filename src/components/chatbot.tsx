import { getAuthToken } from "@/app/helpers/auth";
import { DeepChat } from "deep-chat-react";

export default function Chatbot({
  histories,
  sessionId,
  path,
}: {
  histories: { role: string; text: string }[];
  sessionId: string;
  path: string;
}) {
  return (
    <div className="w-full h-full">
      <DeepChat
        connect={{
          url: `${process.env.NEXT_PUBLIC_NODEJS_BACKEND_API_URL}${path}`,
          method: "POST",
          headers: { Authorization: `Bearer ${getAuthToken()}` },
          additionalBodyProps: { sessionId: sessionId },
        }}
        style={{
          borderRadius: "10px",
          width: "800px",
          height: "700px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
        textInput={{
          placeholder: { text: "Welcome to the demo!" },
          styles: {
            container: {
              borderRadius: "10px",
              padding: "5px",
            },
          },
        }}
        history={histories}
      />
    </div>
  );
}
