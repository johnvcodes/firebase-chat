import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="m-auto flex items-center gap-2">
      <Link
        to="/login"
        className="flex min-w-[100px] items-center justify-center rounded border border-neutral-400 p-2 shadow-md transition-colors duration-300 hover:border-neutral-500 focus:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500 dark:focus:border-neutral-500"
      >
        Entrar
      </Link>
      <Link
        to="/register"
        className="flex min-w-[100px] items-center justify-center rounded border border-neutral-400 p-2 shadow-md transition-colors duration-300 hover:border-neutral-500 focus:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500 dark:focus:border-neutral-500"
      >
        Criar conta
      </Link>
    </div>
  );
}
