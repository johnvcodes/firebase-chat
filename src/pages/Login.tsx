import { ChangeEvent, FormEvent, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthFormAction, AuthFormState } from "../types/auth-form";
import { auth } from "../firebase/config";
import ThemeButton from "../components/ThemeButton";

const initialState: Pick<AuthFormState, "email" | "password"> = {
  email: "",
  password: "",
};

function loginReducer(
  state: typeof initialState,
  action: AuthFormAction<typeof initialState>
): typeof initialState {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
  }
}

export default function Login() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: event.target.name as keyof typeof initialState,
      payload: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (state.password.length < 6) return;
    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
    } catch (error) {
      return console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative m-auto grid w-80 gap-2 rounded border border-neutral-50 bg-neutral-50 p-2 shadow dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="rounded bg-neutral-200 p-2 font-bold uppercase tracking-widest dark:bg-neutral-900">
        Entre em sua conta
      </h2>

      <label htmlFor="email" className="w-fit">
        E-mail
      </label>
      <input
        onChange={handleChange}
        value={state.email}
        type="email"
        id="email"
        name="email"
        required
        placeholder="usuario@email.com"
        className="rounded bg-neutral-200 p-2 dark:bg-neutral-900"
      />
      <label htmlFor="password" className="w-fit">
        Senha
      </label>
      <input
        onChange={handleChange}
        value={state.password}
        type="password"
        id="password"
        name="password"
        required
        minLength={6}
        placeholder="Mínimo de 6 dígitos"
        className="rounded bg-neutral-200 p-2 dark:bg-neutral-900"
      />
      <Link to="/register" className="w-fit">
        Não possui uma conta? Criar
      </Link>
      <Link
        to="/"
        className="absolute -top-10 rounded border border-neutral-300 bg-neutral-50 p-1 dark:border-neutral-700 dark:bg-neutral-800"
      >
        Voltar
      </Link>
      <button className="w-fit justify-self-center rounded bg-neutral-200 p-1 transition-colors duration-200 hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-700">
        Confirmar
      </button>
    </form>
  );
}
