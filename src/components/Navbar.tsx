import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      <Link to="/" className="text-blue-600 hover:text-blue-800">
        Home
      </Link>
      
        <Link to="/auth/login" className="text-blue-600 hover:text-blue-800">
          Login
        </Link>
        <Link to="/auth/register" className="ml-4 text-blue-600 hover:text-blue-800">
          Register
        </Link>
    </nav>
  );
}