import { Outlet } from "react-router-dom";
import Contacts from "../components/Contacts";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="flex grow overflow-hidden">
      <Contacts />
      <Outlet />
    </div>
  );
}
