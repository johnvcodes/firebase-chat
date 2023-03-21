import { ChangeEvent, FormEvent, useReducer } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

type RegisterState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterAction = {
  type: keyof RegisterState;
  payload: string;
};

const initialState: RegisterState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function registerReducer(
  state: RegisterState,
  action: RegisterAction
): RegisterState {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
  }
}

export default function Register() {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: event.target.name as keyof RegisterState,
      payload: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!state.email.includes("@")) return;
    if (state.password.length < 6) return;
    if (state.password !== state.confirmPassword) return;
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      await updateProfile(response.user, { displayName: state.username });
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
      <label htmlFor="username">Nome de Usuário</label>
      <input
        onChange={handleChange}
        value={state.username}
        type="text"
        id="username"
        name="username"
        required
        placeholder="Nome de usuário"
        className="rounded bg-neutral-900 p-2"
      />
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
      <label htmlFor="confirm-password">Confirmar senha</label>
      <input
        onChange={handleChange}
        value={state.confirmPassword}
        type="password"
        id="confirm-password"
        name="confirmPassword"
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
