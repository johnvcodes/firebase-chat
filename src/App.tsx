import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";

export default function App() {
  document.documentElement.classList.add("dark");
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}
