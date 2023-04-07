import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { nanoid } from "nanoid";
import { firestore } from "../firebase/config";
import { Contact } from "../types/contact-type";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import AddContact from "./AddContact";
import SearchContact from "./SearchContact";
import ContactCard from "./ContactCard";
import notification from "../assets/sounds/notification.mp3";

export default function Contacts() {
  const { user } = useAuth();
  const { dispatch } = useChat();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState<string>("");

  const filterContacts = Object.values(contacts)
    .sort(
      (a, b) =>
        Number(b.lastMessage.date?.toDate()) -
        Number(a.lastMessage.date?.toDate())
    )
    .filter((item) => {
      if (!search) return true;
      return item.data.displayName.toLowerCase().includes(search.toLowerCase());
    });

  async function handleSelect(contact: Contact) {
    if (!user) return;
    dispatch({
      type: "changedChat",
      payload: {
        data: contact.data,
        lastMessage: { content: "", date: null, senderId: "" },
      },
    });
    setSearch("");
  }

  const getChats = () => {
    if (!user) return;
    let unsubscribe = onSnapshot(
      doc(firestore, "chatRooms", user.uid),
      (response) => {
        if (!response.exists()) return;
        setContacts(
          response.data({ serverTimestamps: "previous" }) as Contact[]
        );
      },
      (error) => {
        return;
      }
    );

    return () => {
      unsubscribe();
    };
  };
  function playSound() {
    new Audio(notification).play();
  }

  useEffect(() => {
    user && user.uid && getChats();
  }, [user && user.uid]);

  useEffect(() => {
    contacts &&
      user &&
      Object.values(contacts).map((item) =>
        item.lastMessage.senderId !== user.uid ? playSound() : null
      );
  }, [contacts]);

  return (
    <div className="flex w-fit flex-col gap-2 border-r border-neutral-300 p-2 dark:border-neutral-700">
      <AddContact />
      <SearchContact searchValue={search} setSearch={setSearch} />
      {filterContacts.map((contact) => (
        <ContactCard
          key={nanoid(16)}
          id={nanoid(16)}
          contact={contact}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
}
