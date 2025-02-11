import { useDispatch } from "react-redux";
import { logoutSuccess } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(logoutSuccess());
    queryClient.clear();
    navigate("/auth/login");
  };

  return (
    <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
      Logout
    </button>
  );
}