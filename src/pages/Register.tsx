import { ChangeEvent, FormEvent, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/config";
import { FirebaseError } from "firebase/app";

type RegisterState = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterAction<T = RegisterState> = {
  type: keyof T;
  payload: string;
};

const registerInitialState: RegisterState = {
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
      return {
        ...state,
        username: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "password":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
}

export default function Register() {
  const [register, dispatch] = useReducer(
    registerReducer,
    registerInitialState
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let { name, value } = event.target;

    dispatch({
      type: name as keyof RegisterState,
      payload: value,
    });
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    if (!register.email.includes("@")) return;
    if (register.password.length < 6) return;
    if (register.password !== register.confirmPassword) return;
    let response: UserCredential;

    try {
      response = await createUserWithEmailAndPassword(
        auth,
        register.email,
        register.password
      );

      await updateProfile(response.user, { displayName: register.username });
    } catch (error) {
      return console.log(error);
    }

    try {
      await setDoc(doc(firestore, "users", response.user.uid), {
        uid: response.user.uid,
        displayName: register.username,
        email: register.email,
        createdAt: serverTimestamp(),
      });
      await setDoc(doc(firestore, "chatRooms", response.user.uid), {});
    } catch (error) {
      let message = "Unknown error";
      if (error instanceof FirebaseError) message = error.code;
      return console.log(message);
    }
  }

  return (
    <form onSubmit={handleRegister} className="m-auto grid min-w-[300px] gap-4">
      <Link
        to="/"
        className="justify-self-end text-sm text-neutral-400 transition-colors duration-300 hover:text-blue-500"
      >
        Voltar
      </Link>
      <label htmlFor="username" className="w-fit uppercase tracking-widest">
        Nome de Usuário
      </label>
      <input
        onChange={handleChange}
        value={register.username}
        type="text"
        id="username"
        name="username"
        required
        placeholder="Nome de usuário"
        className="rounded border border-neutral-700 bg-transparent p-2 text-neutral-50 shadow-md  transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-500 focus:outline-none"
      />
      <label htmlFor="email" className="w-fit uppercase tracking-widest">
        E-mail
      </label>
      <input
        onChange={handleChange}
        value={register.email}
        type="email"
        id="email"
        name="email"
        required
        placeholder="usuario@email.com"
        className="rounded border border-neutral-700 bg-transparent p-2 text-neutral-50 shadow-md  transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-500 focus:outline-none"
      />
      <label htmlFor="password" className="w-fit uppercase tracking-widest">
        Senha
      </label>
      <input
        onChange={handleChange}
        value={register.password}
        type="password"
        id="password"
        name="password"
        required
        minLength={6}
        placeholder="Mínimo de 6 dígitos"
        className="rounded border border-neutral-700 bg-transparent p-2 text-neutral-50 shadow-md  transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-500 focus:outline-none"
      />
      <label
        htmlFor="confirm-password"
        className="w-fit uppercase tracking-widest"
      >
        Confirmar senha
      </label>
      <input
        onChange={handleChange}
        value={register.confirmPassword}
        type="password"
        id="confirm-password"
        name="confirmPassword"
        required
        minLength={6}
        placeholder="Mínimo de 6 dígitos"
        className="rounded border border-neutral-700 bg-transparent p-2 text-neutral-50 shadow-md  transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-500 focus:border-neutral-500 focus:outline-none"
      />
      <button className="w-fit justify-self-center rounded border border-blue-500 bg-blue-700 p-2 shadow-md transition-colors duration-300 hover:bg-blue-500 focus:bg-blue-500 focus:outline-none">
        Confirmar
      </button>
      <div className="flex w-fit items-center gap-1 justify-self-center px-2 text-sm text-neutral-400">
        <span className="flex items-center">Já possui uma conta?</span>
        <Link
          to="/login"
          className="flex items-center text-neutral-50 underline underline-offset-4 transition-colors duration-300 hover:text-blue-500"
        >
          Entrar
        </Link>
      </div>
    </form>
  );
}
