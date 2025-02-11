import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Register success");
      navigate("/auth/login");
    },
    onError: (error) => {
      alert(error instanceof Error ? error.message : "Register failed");
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, username, name });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Register
        </h2>
        {registerMutation.isError && (
          <p className="text-red-500 text-sm mb-4">{registerMutation.error?.message}</p>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full p-3 rounded text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50"
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}