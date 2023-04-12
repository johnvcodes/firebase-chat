import { useEffect, useRef } from "react";
import { Message as MessageType } from "./Chat";
import Message from "./Message";

type Props = {
  messages: MessageType[];
};

export default function MessagesBox({ messages }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col-reverse gap-2 overflow-x-hidden bg-neutral-200 p-2 shadow-inner dark:bg-neutral-950">
      <span ref={ref}></span>
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
  );
}
