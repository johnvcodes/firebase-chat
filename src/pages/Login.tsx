export default function Login() {
  return (
    <form className="m-auto grid w-80 gap-2 rounded border border-neutral-50 bg-neutral-50 p-2 shadow dark:border-neutral-700 dark:bg-neutral-800">
      <h2 className="w-fit justify-self-center rounded bg-neutral-900 p-1 font-bold uppercase tracking-widest">
        Crie sua conta
      </h2>
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="usuario@email.com"
        className="rounded bg-neutral-900 p-2"
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        minLength={6}
        placeholder="Mínimo de 6 dígitos"
        className="rounded bg-neutral-900 p-2"
      />
      <button className="w-fit justify-self-center rounded bg-neutral-900 p-1">
        Confirmar
      </button>
    </form>
  );
}
