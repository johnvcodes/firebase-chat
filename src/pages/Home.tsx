import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center gap-2 ">
      <Link
        to="/register"
        className="rounded bg-neutral-50 p-1 font-bold uppercase tracking-widest transition-transform hover:scale-105 dark:bg-neutral-800"
      >
        Criar conta
      </Link>
      <Link
        to="/login"
        className="rounded bg-neutral-200 p-1 font-bold uppercase tracking-widest transition-transform hover:scale-105 dark:bg-neutral-800"
      >
        Entrar
      </Link>
    </div>
  );
}
