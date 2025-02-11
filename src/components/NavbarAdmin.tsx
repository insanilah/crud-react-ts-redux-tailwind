import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface NavbarAdminProps {
  user: string; // Sesuaikan dengan tipe data user
}

export default function NavbarAdmin({ user }: NavbarAdminProps) {
  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      <Link to="/" className="text-blue-600 hover:text-blue-800">
        Home
      </Link>
      <>
        <span className="text-gray-700">Welcome, {user}</span>
        <LogoutButton />
      </>
    </nav>
  );
}
