import { Outlet } from "react-router-dom";
import Chat from "../components/Chat";
import Contacts from "../components/Contacts";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex grow  overflow-hidden">
        <Contacts />
        <Outlet />
      </div>
    </div>
  );
}
