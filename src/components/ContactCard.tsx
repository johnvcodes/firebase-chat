import { NavLink } from "react-router-dom";
import { Contact } from "../types/contact-type";

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
        ${
          isActive
            ? "bg-neutral-200 dark:bg-neutral-800"
            : "bg-neutral-50 dark:bg-neutral-900"
        }
          flex items-center gap-2 rounded border border-neutral-300  p-2 hover:bg-neutral-100 dark:border-neutral-700  dark:hover:bg-neutral-700`
      }
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500">
        {contact.data.displayName.slice(0, 1)}
      </div>
      <div className="flex  grow flex-col gap-1 ">
        <h2 className="grow">{contact.data.displayName}</h2>
        <span className="flex w-full max-w-[160px] items-center overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
          {contact.lastMessage}
        </span>
      </div>
    </NavLink>
  );
}
