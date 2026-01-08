import { useAuth } from "../context/AuthContext";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";

const Navbar = () => {
  const { logout } = useAuth();
  const { data: user } = useCurrentUser();

  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between">
      <span className="font-bold">YouTube</span>

      {user && (
        <div className="flex items-center gap-4">
          <span>{user.username}</span>
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
