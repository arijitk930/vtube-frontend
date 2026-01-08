import { useState } from "react";
import { useLogin } from "../hooks/auth/useLogin";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useLogin((data) => {
    login(data.data.accessToken);
    navigate("/", { replace: true });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting", email, password);
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white p-6 rounded w-80"
      >
        <h2 className="text-white text-xl mb-4">Login</h2>

        <input
          className="w-full  mb-3 p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
