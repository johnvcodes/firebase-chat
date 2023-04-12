import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import AuthProvider from "./contexts/AuthContext";
import Header from "./components/Header";

export default function App() {
  return (
    <AuthProvider>
      <Container>
        <div className="grid h-full grid-rows-[min-content_auto]">
          <Header />
          <Outlet />
        </div>
      </Container>
    </AuthProvider>
  );
}
