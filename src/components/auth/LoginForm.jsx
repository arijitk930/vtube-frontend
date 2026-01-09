import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useLogin(function (data) {
    login(data.data.accessToken);
    navigate("/", { replace: true });
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ email, password });
  }

  return (
    <div className="w-full max-w-md bg-gray-900/80 backdrop-blur border border-gray-800 rounded-xl shadow-xl p-8">
      {/* Logo + Brand */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-3">
          <span className="text-xl font-bold text-white">▶</span>
        </div>
        <h1 className="text-2xl font-bold text-white">VPlayer</h1>
        <p className="text-sm text-gray-400 mt-1">Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
            className="w-full px-3 py-2.5 rounded-md bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
            className="w-full px-3 py-2.5 rounded-md bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm">{error.message}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} VPlayer. All rights reserved.
      </p>
    </div>
  );
}

export default LoginForm;
