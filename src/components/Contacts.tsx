import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import ContactCard from "./ContactCard";

import { nanoid } from "nanoid";
import { useChat } from "../contexts/ChatContext";
import AddContact from "./AddContact";
import SearchContact from "./SearchContact";
import { Contact } from "../types/contact-type";

export default function Contacts() {
  const { user } = useAuth();
  const { dispatch } = useChat();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState<string>("");

  const filterContacts = Object.values(contacts).filter((item) => {
    if (!search) return true;
    return item.data.displayName.toLowerCase().includes(search.toLowerCase());
  });

  async function handleSelect(contact: Contact) {
    if (!user) return;
    dispatch({
      type: "changedChat",
      payload: { data: contact.data, lastMessage: "" },
    });
    setSearch("");
  }

  const getChats = () => {
    if (!user) return;
    let unsubscribe = onSnapshot(
      doc(firestore, "chatRooms", user.uid),
      (response) => {
        if (!response.exists()) return;
        setContacts(response.data() as Contact[]);
      },
      (error) => {
        return;
      }
    );

    return () => {
      unsubscribe();
    };
  };

  useEffect(() => {
    user && user.uid && getChats();
  }, [user && user.uid]);

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
