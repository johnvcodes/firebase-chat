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

type Props = {};

export default function AddContact({}: Props) {
  const { user } = useAuth();
  const [input, setInput] = useState<string>("");

  async function handleAddContact(event: FormEvent) {
    event.preventDefault();
    if (!user) return;

    let usersQuery = query(
      collection(firestore, "users"),
      where("email", "==", input)
    );

    setInput("");

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
    });
  }

  return (
    <form
      onSubmit={handleAddContact}
      className="flex items-center gap-2 rounded"
    >
      <input
        onChange={(event) => setInput(event.target.value)}
        value={input}
        type="email"
        name="addContact"
        id="add-contact"
        placeholder="Adicionar contato"
        required
        className="rounded border border-neutral-400 bg-transparent p-2 text-neutral-900 transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-600 focus:border-neutral-600 focus:outline-none dark:border-neutral-700 dark:text-neutral-50 dark:hover:border-neutral-500 dark:focus:border-neutral-500"
      />
      <label htmlFor="add-contact" className="sr-only">
        Adicionar contato
      </label>
    </form>
  );
}
