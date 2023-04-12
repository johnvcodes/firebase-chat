import { Timestamp } from "firebase/firestore";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  senderId: string;
  text: string;
  date: Timestamp;
};

export default function Message({ senderId, text, date }: Props) {
  const { user } = useAuth();

  return (
    <div
      className={`${
        senderId === user?.uid ? "self-end" : "self-start"
      } flex flex-col gap-2`}
    >
      <p
        className={`${
          senderId === user?.uid
            ? "self-end bg-blue-500 "
            : "self-start bg-neutral-400 dark:bg-neutral-700"
        } w-fit rounded p-2 text-neutral-50 shadow-md`}
      >
        {text}
      </p>
      <time
        dateTime={format(date.toDate(), "dd/MM")}
        className={`${
          senderId === user?.uid ? "self-end" : "self-start"
        } text-xs text-neutral-500 dark:text-neutral-400`}
      >
        {formatDistanceToNow(date.toDate(), {
          locale: ptBR,
          addSuffix: true,
        })}
      </time>
    </div>
  );
}
