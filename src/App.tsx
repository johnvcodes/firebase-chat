import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Container>
        <Outlet />
      </Container>
    </AuthProvider>
  );
}
