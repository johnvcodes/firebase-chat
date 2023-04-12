import { FormEvent, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { firestore } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

export default function SendMessage() {
  const { user } = useAuth();
  const { chat } = useChat();

  const [input, setInput] = useState<string>("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    if (!input) return;
    try {
      await updateDoc(doc(firestore, "chatMessages", chat.chatId), {
        messages: arrayUnion({
          id: nanoid(16),
          senderId: user.uid,
          text: input,
          date: Timestamp.now(),
        }),
      });
    } catch (error) {
      return;
    }

    setInput("");

    try {
      await updateDoc(doc(firestore, "chatRooms", user.uid), {
        [chat.chatId + ".lastMessage"]: {
          content: input,
          date: serverTimestamp(),
          senderId: user.uid,
          seen: false,
        },
      });
      await updateDoc(doc(firestore, "chatRooms", chat.data.uid), {
        [chat.chatId + ".lastMessage"]: {
          content: input,
          date: serverTimestamp(),
          senderId: user.uid,
          seen: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-[48px]  w-full items-center divide-neutral-300 overflow-hidden border-t border-neutral-300 bg-neutral-50 shadow dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <label htmlFor="send-message" className="sr-only">
        Envie uma mensagem!
      </label>
      <input
        onChange={(event) => setInput(event.target.value)}
        value={input}
        type="text"
        name="sendMessage"
        id="send-message"
        placeholder="Envie uma mensagem..."
        autoComplete="off"
        className="w-full bg-transparent p-2 focus:outline-none"
      />
      <button className="h-full border-l bg-neutral-200 p-2 transition-colors duration-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-700">
        Enviar
      </button>
    </form>
  );
}
