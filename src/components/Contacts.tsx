import ContactCard from "./ContactCard";

type Props = {};

export default function Contacts({}: Props) {
  let contacts = [
    { id: "1", name: "John", online: true },
    { id: "2", name: "Yago", online: false },
    { id: "3", name: "Andres", online: true },
  ];
  return (
    <div className="flex flex-col gap-2 p-2">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          id={contact.id}
          name={contact.name}
          online={contact.online}
        />
      ))}
    </div>
  );
}
