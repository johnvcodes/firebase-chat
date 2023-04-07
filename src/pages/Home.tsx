import { Link } from "react-router-dom";
import ThemeButton from "../components/ThemeButton";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Link
          to="/register"
          className="flex items-center justify-center rounded bg-neutral-200 p-1 font-bold uppercase tracking-widest transition-transform hover:scale-105 dark:bg-neutral-800"
        >
          Criar conta
        </Link>
        <Link
          to="/login"
          className="flex items-center justify-center rounded bg-neutral-200 p-1 font-bold uppercase tracking-widest transition-transform hover:scale-105 dark:bg-neutral-800"
        >
          Entrar
        </Link>
      </div>
    </div>
  );
}
