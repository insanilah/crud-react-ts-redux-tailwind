import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../../services/authService";
import { Link } from "react-router-dom";
// import { store } from "../../store/store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (respJson) => {
      localStorage.setItem("token", respJson.data.accessToken);
      const decoded: { username: string } = jwtDecode(respJson.data.accessToken);
      // console.log("decoded:",decoded)
      dispatch(loginSuccess({ username: decoded.username, token: respJson.data.accessToken }));
      // console.log("Redux after dispatch:", store.getState());
      navigate("/dashboard");
    },
    onError: (err) => {
      alert(err instanceof Error ? err.message : "Login failed");
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Login
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate({ email, password });
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full p-3 rounded text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/auth/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}