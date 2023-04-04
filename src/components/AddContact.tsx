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
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".lastMessage"]: "",
        });

        await updateDoc(doc(firestore, "chatRooms", item.data().uid), {
          [combinedId + ".data"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
          [combinedId + ".lastMessage"]: "",
        });

        await setDoc(doc(firestore, "chatMessages", combinedId), {
          messages: [],
        });
      } catch (error) {
        console.log(error);
      }
    });
    setInput("");
  }

  return (
    <form
      onSubmit={handleAddContact}
      className="flex items-center gap-2 rounded border border-neutral-300 dark:border-neutral-700"
    >
      <input
        onChange={(event) => setInput(event.target.value)}
        value={input}
        type="email"
        name="addContact"
        id="add-contact"
        placeholder="Adicionar contato"
        required
        className="bg-transparent p-2"
      />
      <label htmlFor="add-contact" className="sr-only">
        Adicionar contato
      </label>
    </form>
  );
}
