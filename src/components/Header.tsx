import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-neutral-50 p-2 dark:bg-neutral-800">
      <h2 className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text font-bold uppercase tracking-widest text-transparent">
        Firebase Chat
      </h2>
      <div className="flex items-center gap-2">
        <Link to="/register">Crie sua conta</Link>
        <Link to="/login">Entrar</Link>
      </div>
    </header>
  );
}
