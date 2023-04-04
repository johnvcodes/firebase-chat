import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  document.documentElement.classList.add("dark");
  return (
    <AuthProvider>
      <Container>
        <Outlet />
      </Container>
    </AuthProvider>
  );
}
