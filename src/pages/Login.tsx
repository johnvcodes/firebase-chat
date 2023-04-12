import { ChangeEvent, FormEvent, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/config";

type LoginState = {
  email: string;
  password: string;
};

type LoginAction<T = LoginState> = {
  type: keyof T;
  payload: string;
};

const loginInitialState: LoginState = {
  email: "",
  password: "",
};

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "password":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [login, dispatch] = useReducer(loginReducer, loginInitialState);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    dispatch({ type: name as keyof LoginState, payload: value });
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
    } catch (error) {
      let message = "Unknown error";
      if (error instanceof FirebaseError) message = error.code;
      return console.log(message);
    }
    navigate("/dashboard");
  }
  return (
    <form onSubmit={handleLogin} className="m-auto grid min-w-[300px] gap-4">
      <Link
        to="/"
        className="justify-self-end text-sm text-neutral-400 transition-colors duration-300 hover:text-blue-500"
      >
        Voltar
      </Link>
      <label htmlFor="email" className="w-fit uppercase tracking-widest">
        E-mail
      </label>
      <input
        onChange={handleChange}
        value={login.email}
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        className="rounded border border-neutral-700 bg-transparent p-2 text-neutral-50 shadow-md  transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-500 focus:outline-none"
      />
      <label htmlFor="password" className="w-fit uppercase tracking-widest">
        Senha
      </label>
      <input
        onChange={handleChange}
        value={login.password}
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
        className="rounded border border-neutral-700 bg-transparent p-2 text-neutral-50 shadow-md  transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-500 focus:outline-none"
      />
      <button className="w-fit justify-self-center rounded border border-blue-500 bg-blue-700 p-2 shadow-md transition-colors duration-300 hover:bg-blue-500 focus:bg-blue-500 focus:outline-none">
        Entrar
      </button>
      <div className="flex w-fit items-center gap-1 justify-self-center px-2 text-sm text-neutral-400">
        <span className="flex items-center">Ainda não possui uma conta?</span>
        <Link
          to="/register"
          className="flex items-center text-neutral-50 underline underline-offset-4 transition-colors duration-200 hover:text-blue-500"
        >
          Criar conta
        </Link>
      </div>
    </form>
  );
}
