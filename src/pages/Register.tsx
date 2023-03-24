import { ChangeEvent, FormEvent, useReducer } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { auth, firestore } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { AuthFormAction, AuthFormState } from "../types/auth-form";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const initialState: AuthFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function registerReducer(
  state: AuthFormState,
  action: AuthFormAction<AuthFormState>
): AuthFormState {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload as string };
    case "email":
      return { ...state, email: action.payload as string };
    case "password":
      return { ...state, password: action.payload as string };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload as string };
    case "avatar":
      return { ...state, avatar: action.payload as File };
    default:
      return state;
  }
}

export default function Register() {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    let { name, files, value } = event.target;

    dispatch({
      type: name as keyof AuthFormState,
      payload: (files && files[0]) || value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!state.email.includes("@")) return;
    if (state.password.length < 6) return;
    if (state.password !== state.confirmPassword) return;
    let response: UserCredential;

    try {
      response = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      await updateProfile(response.user, { displayName: state.username });
    } catch (error) {
      return console.log(error);
    }
    navigate("/dashboard");

    try {
      await setDoc(doc(firestore, "users", response.user.uid), {
        uid: response.user.uid,
        displayName: state.username,
        email: state.email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative m-auto grid w-80 gap-2 rounded border border-neutral-50 bg-neutral-50 p-2 shadow dark:border-neutral-700 dark:bg-neutral-800"
    >
      <h2 className="w-fit justify-self-center rounded bg-neutral-900 p-1 font-bold uppercase tracking-widest">
        Crie sua conta
      </h2>
      <label htmlFor="username" className="w-fit">
        Nome de Usuário
      </label>
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
        className="rounded bg-neutral-900 p-2"
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
        className="rounded bg-neutral-900 p-2"
      />
      <label htmlFor="confirm-password" className="w-fit">
        Confirmar senha
      </label>
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
      <label htmlFor="avatar" className="w-fit">
        Foto de perfil
      </label>
      <input
        onChange={handleChange}
        accept=".jpg, .jpeg, .png"
        type="file"
        id="avatar"
        name="avatar"
        className="rounded bg-neutral-900 p-2"
      />
      <Link to="/login">Já possui uma conta? Entrar</Link>
      <Link
        to="/"
        className="absolute -top-10 rounded border border-neutral-300 bg-neutral-50 p-1 dark:border-neutral-700 dark:bg-neutral-800"
      >
        Voltar
      </Link>
      <button className="w-fit justify-self-center rounded bg-neutral-900 p-1">
        Confirmar
      </button>
    </form>
  );
}
