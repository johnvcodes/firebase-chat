import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/config";
import ThemeButton from "./ThemeButton";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  }
  return (
    <header className="flex items-center justify-between border-b border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex items-center gap-2">
        <h2 className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text font-bold uppercase tracking-widest text-transparent">
          Firebase Chat
        </h2>
        <ThemeButton />
      </div>
      <div className="flex items-center gap-2">
        {user && user.displayName && <p>{user.displayName}</p>}
        <button onClick={logout}>Sair</button>
      </div>
    </header>
  );
}
