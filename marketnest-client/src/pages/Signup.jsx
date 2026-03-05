import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        role
      });

      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">MarketNest</h1>
          <p className="text-slate-400">Create your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 px-4 py-3 rounded-lg mb-6 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg mb-6 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition cursor-pointer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer" className="bg-slate-900">Customer</option>
            <option value="brand" className="bg-slate-900">Brand</option>
          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-blue-500/50"
          >
            Sign Up
          </button>

          <p className="text-center text-slate-400 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}