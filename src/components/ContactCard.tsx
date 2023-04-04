import React from "react";
import { NavLink } from "react-router-dom";
import { Contact } from "./Contacts";

type Props = {
  id: string;
  contact: Contact;
  handleSelect(contact: Contact): void;
};

export default function ContactCard({ id, contact, handleSelect }: Props) {
  return (
    <NavLink
      onClick={() => handleSelect(contact)}
      to={`/dashboard/${contact.data.displayName
        .toLowerCase()
        .split(" ")
        .join("-")}`}
      className={({ isActive }) =>
        `
        ${isActive && "bg-neutral-200 dark:bg-neutral-900"}
          flex items-center gap-2 rounded border border-neutral-300 bg-neutral-50 p-2 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700`
      }
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500">
        {contact.data.displayName.slice(0, 1)}
      </div>
      <div className="flex grow flex-col gap-2">
        <h2 className="grow">{contact.data.displayName}</h2>
        <span className="flex h-2 w-2 items-center text-sm">
          {contact.lastMessage}
        </span>
      </div>
    </NavLink>
  );
}
