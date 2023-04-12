import { FormEvent, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { UserPlusIcon } from "@heroicons/react/24/solid";

type Props = {};

export default function AddContact({}: Props) {
  const { user } = useAuth();
  const [input, setInput] = useState<string>("");
  const [status, setStatus] = useState("");

  async function handleAddContact(event: FormEvent) {
    event.preventDefault();
    if (!user) return;

    let usersQuery = query(
      collection(firestore, "users"),
      where("email", "==", input)
    );

    setInput("");
    setStatus("Pedido enviado");
    let response = await getDocs(usersQuery);

    response.forEach(async (item) => {
      if (!item.exists()) return;

      try {
        let combinedId =
          user.uid > item.data().uid
            ? user.uid + item.data().uid
            : item.data().uid + user.uid;

        await updateDoc(doc(firestore, "chatRooms", user.uid), {
          [combinedId + ".data"]: {
            uid: item.data().uid,
            displayName: item.data().displayName,
          },
          [combinedId + ".lastMessage"]: {},
        });

        await updateDoc(doc(firestore, "chatRooms", item.data().uid), {
          [combinedId + ".data"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".lastMessage"]: {},
        });

        await setDoc(doc(firestore, "chatMessages", combinedId), {
          messages: [],
        });
      } catch (error) {
        console.log(error);
      }
      setStatus("");
    });
  }

  return (
    <form onSubmit={handleAddContact} className="flex flex-col gap-2">
      <div className="flex items-center overflow-hidden rounded border  border-neutral-400 bg-transparent text-neutral-900 transition-colors duration-300 placeholder:text-neutral-400 focus-within:border-neutral-600 focus-within:outline-none hover:border-neutral-600 dark:border-neutral-700 dark:text-neutral-50 dark:focus-within:border-neutral-500 dark:hover:border-neutral-500">
        <input
          onChange={(event) => setInput(event.target.value)}
          value={input}
          type="email"
          name="addContact"
          id="add-contact"
          placeholder="E-mail do contato"
          required
          className="bg-transparent px-2 py-1 text-neutral-900 transition-colors duration-300 placeholder:text-neutral-400 focus:outline-none  dark:text-neutral-50"
        />
        <label htmlFor="add-contact" className="sr-only">
          E-mail do contato
        </label>
        <button className="px-2 py-1 transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-700">
          <UserPlusIcon className="h-6 w-6" />
        </button>
      </div>
      {status && <span className="w-1/2 text-xs text-blue-500">{status}</span>}
    </form>
  );
}
