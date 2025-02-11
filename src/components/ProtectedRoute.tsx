import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function ProtectedRoute() {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
