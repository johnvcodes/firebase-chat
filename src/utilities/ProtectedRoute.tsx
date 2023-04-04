import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ChatProvider } from "../contexts/ChatContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  let location = useLocation();
  if (!user) return <Navigate to="/" state={{ from: location }} />;
  return (
    <ChatProvider>
      <Outlet />
    </ChatProvider>
  );
}
