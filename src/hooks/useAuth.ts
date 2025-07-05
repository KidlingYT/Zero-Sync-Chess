// eventually a real auth
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  if (username !== null && username.length > 0) return true;
  else navigate("/");
}
