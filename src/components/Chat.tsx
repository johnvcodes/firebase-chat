import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import Message from "./Message";
import SendMessage from "./SendMessage";
import MessagesBox from "./MessagesBox";

export type Message = {
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
        setMessages(response.data({ serverTimestamps: "estimate" }).messages);
      },
      (error) => {
        return;
      }
    );

    return () => unsubscribe();
  }, [chat.chatId]);

  useEffect(() => {
    if (!user) return;
    let combinedId =
      user.uid > chat.data.uid
        ? user.uid + chat.data.uid
        : chat.data.uid + user.uid;

    if (
      chat.lastMessage.seen === false &&
      chat.lastMessage.senderId !== user.uid
    ) {
      updateDoc(doc(firestore, "chatRooms", user.uid), {
        [`${combinedId}.lastMessage.seen`]: true,
      });
      updateDoc(doc(firestore, "chatRooms", chat.data.uid), {
        [`${combinedId}.lastMessage.seen`]: true,
      });
    }
  }, [chat.lastMessage.senderId]);

  return (
    <div className="flex grow flex-col justify-end">
      <MessagesBox messages={messages} />
      <SendMessage />
    </div>
  );
}
