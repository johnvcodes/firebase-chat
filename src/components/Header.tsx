import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/config";
import ThemeButton from "./ThemeButton";

export default function Header() {
  const { user } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="flex items-center justify-between border-b border-neutral-400 p-2 dark:border-neutral-700">
      <h2 className="rounded border border-blue-500 bg-blue-700 p-1 font-bold uppercase tracking-widest text-neutral-50">
        Talq
      </h2>
      <div className="flex items-center gap-2">
        <ThemeButton />
        {user && (
          <button
            onClick={handleLogout}
            className="rounded px-2 py-1 transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          >
            Sair
          </button>
        )}
      </div>
    </header>
  );
}
