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
            ? "bg-neutral-400 text-neutral-50 dark:bg-neutral-700"
            : "hover:bg-neutral-200 dark:hover:bg-neutral-800"
        }
          flex items-center gap-2 p-2`
      }
    >
      {({ isActive }) => {
        return (
          <>
            <div
              className={`${
                isActive
                  ? "border-neutral-300 dark:border-neutral-500"
                  : "border-neutral-300 dark:border-neutral-700"
              } flex h-8 w-8 items-center justify-center rounded border `}
            >
              {contact.data.displayName.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex grow flex-col ">
              <h2 className="grow">{contact.data.displayName}</h2>
              <span
                className={`${
                  !isActive && "text-neutral-500 dark:text-neutral-400"
                } flex w-full max-w-[160px] items-center overflow-hidden overflow-ellipsis whitespace-nowrap text-sm`}
              >
                {contact.lastMessage.content}
              </span>
            </div>
          </>
        );
      }}
    </NavLink>
  );
}
