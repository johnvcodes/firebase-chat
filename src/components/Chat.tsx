import { FormEvent, useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { nanoid } from "nanoid";
import { format, formatDistance, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Message = {
  id: string;
  text?: string;
  senderId: string;
  date: Timestamp;
};

export default function Chat() {
  const { user } = useAuth();
  const { chat } = useChat();

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    if (!chat.chatId) return;
    const unsubscribe = onSnapshot(
      doc(firestore, "chatMessages", chat.chatId),
      (response) => {
        if (!response.exists()) return;
        setMessages(response.data().messages);
      }
    );
    return () => unsubscribe();
  }, [chat.chatId]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    try {
      await updateDoc(doc(firestore, "chatMessages", chat.chatId), {
        messages: arrayUnion({
          id: nanoid(16),
          senderId: user.uid,
          text: input,
          date: Timestamp.now(),
        }),
      });
    } catch (error) {}

    setInput("");

    try {
      await updateDoc(doc(firestore, "chatRooms", user.uid), {
        [chat.chatId + ".lastMessage"]: input,
      });
      await updateDoc(doc(firestore, "chatRooms", chat.data.uid), {
        [chat.chatId + ".lastMessage"]: input,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative flex grow flex-col justify-end">
      <h1 className="absolute top-2 left-2 rounded border border-neutral-300 p-2 dark:border-neutral-700">
        Conversando com {chat.data.displayName}
      </h1>
      <div className="flex flex-col gap-2 overflow-x-hidden p-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.senderId === user?.uid ? "self-end" : "self-start"
            } flex flex-col gap-1`}
          >
            <p
              className={`${
                message.senderId === user?.uid
                  ? "self-end bg-blue-500 "
                  : "self-start bg-green-500 "
              } w-fit rounded p-2`}
            >
              {message.text}
            </p>
            <time
              dateTime={format(message.date.toDate(), "dd/MM")}
              className={`${
                message.senderId === user?.uid ? "self-end" : "self-start"
              } text-xs`}
            >
              {formatDistanceToNow(message.date.toDate(), {
                locale: ptBR,
                addSuffix: true,
              })}
            </time>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="my-2 flex w-4/5 items-center  divide-x divide-neutral-300 self-center overflow-hidden rounded border border-neutral-300 bg-neutral-50 shadow dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <label htmlFor="send-message"></label>
        <input
          onChange={(event) => setInput(event.target.value)}
          value={input}
          type="text"
          name="sendMessage"
          id="send-message"
          placeholder="Envie uma mensagem..."
          className="w-full bg-transparent p-2 "
        />
        <button className="bg-neutral-200 p-2 dark:bg-neutral-900">
          Enviar
        </button>
      </form>
    </div>
  );
}
