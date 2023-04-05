import { useEffect, useState } from "react";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useNavigate } from "react-router-dom";

type Message = {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
};

export default function Chat() {
  const { user } = useAuth();
  const { chat } = useChat();

  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (!chat.chatId) return navigate("/dashboard");
    const unsubscribe = onSnapshot(
      doc(firestore, "chatMessages", chat.chatId),
      (response) => {
        if (!response.exists()) return;
        setMessages(response.data().messages);
      },
      (error) => {
        return;
      }
    );

    return () => unsubscribe();
  }, [chat.chatId]);

  return (
    <div className="flex grow flex-col justify-end">
      <div className="flex flex-col-reverse gap-2 overflow-x-hidden p-2">
        {messages
          .sort((a, b) => Number(b.date.toDate()) - Number(a.date.toDate()))
          .map((message) => (
            <Message
              key={message.id}
              senderId={message.senderId}
              text={message.text}
              date={message.date}
            />
          ))}
      </div>
      <SendMessage />
    </div>
  );
}
