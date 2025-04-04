import React, { useState } from "react";
import { useAuth, handleAuthError } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(handleAuthError(error));
      alert(error);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-cyan-300 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
        <div className="flex justify-center mb-5">
          <UserPlus size={50} className="text-blue-600" />
        </div>
        <h3 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back</h3>
        <p className="text-center text-sm text-gray-500 mt-2">
          Don't have an account? 
          <Link to="/signup" className="text-blue-600 hover:underline font-semibold ml-1">
            Sign up
          </Link>
        </p>
        {error && <div className="text-red-500 text-sm mt-3 text-center font-semibold">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="relative">
            <input
              id="email-address"
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 font-semibold text-lg shadow-md transition-transform transform hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
