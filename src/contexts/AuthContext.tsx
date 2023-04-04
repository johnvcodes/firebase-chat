import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const currentAuthContext = useContext(AuthContext);
  if (!currentAuthContext)
    throw new Error("useAuth() must be used within <AuthProvider>!");
  return currentAuthContext;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
