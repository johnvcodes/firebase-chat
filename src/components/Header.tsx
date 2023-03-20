import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-neutral-50 p-2 dark:bg-neutral-800">
      <h2>Firebase Chat</h2>
      <div className="flex items-center gap-2">
        <Link to="/register">Crie sua conta</Link>
        <Link to="/login">Entrar</Link>
      </div>
    </header>
  );
}
