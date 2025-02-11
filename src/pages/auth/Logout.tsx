import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
    queryClient.clear();
    navigate("/auth/login", { replace: true });
  }, [dispatch, navigate, queryClient]);

  return null;
}