import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
      <p className="text-lg mb-6">This is a simple blog application with authentication.</p>
      <div className="flex space-x-4">
        <Link to="/auth/login">
          <button className="px-6 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200 transition">
            Login
          </button>
        </Link>
        <Link to="/auth/register">
          <button className="px-6 py-2 bg-white text-purple-600 rounded-lg shadow-md hover:bg-gray-200 transition">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}