import Chat from "../components/Chat";
import Contacts from "../components/Contacts";

export default function Dashboard() {
  return (
    <div className="flex h-full divide-x divide-neutral-300 dark:divide-neutral-700">
      <Contacts />
      <Chat />
    </div>
  );
}
