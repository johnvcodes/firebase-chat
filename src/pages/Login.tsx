import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

type LoginState = {
  email: string;
  password: string;
};

type LoginAction = {
  type: keyof LoginState;
  payload: string;
};

const initialState: LoginState = {
  email: "",
  password: "",
};

function loginReducer(state: LoginState, action: LoginAction): LoginState {
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
      type: event.target.name as keyof LoginState,
      payload: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (state.password.length < 6) return;
    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
    } catch (error) {
      console.log(error);
    }
    navigate("/chat");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto grid w-80 gap-2 rounded border border-neutral-50 bg-neutral-50 p-2 shadow dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="w-fit justify-self-center rounded bg-neutral-900 p-1 font-bold uppercase tracking-widest">
        Crie sua conta
      </h2>
      <label htmlFor="email">E-mail</label>
      <input
        onChange={handleChange}
        value={state.email}
        type="email"
        id="email"
        name="email"
        required
        placeholder="usuario@email.com"
        className="rounded bg-neutral-900 p-2"
      />
      <label htmlFor="password">Senha</label>
      <input
        onChange={handleChange}
        value={state.password}
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
