// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <header className="h-14 border-b border-gray-800 flex items-center justify-between px-6">
      <h1
        className="text-white font-bold text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        VTUBE
      </h1>

      {!token && (
        <button
          onClick={() => navigate("/login")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
        >
          Login
        </button>
      )}
    </header>
  );
}

export default Header;
