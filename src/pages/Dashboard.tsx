import Chat from "../components/Chat";
import Contacts from "../components/Contacts";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex grow divide-x divide-neutral-300 dark:divide-neutral-700">
        <Contacts />
        <Chat />
      </div>
    </div>
  );
}
