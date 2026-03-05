import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-5 flex justify-between items-center shadow-lg border-b border-slate-700">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition">
        MarketNest
      </Link>

      <div className="flex gap-8 items-center">
        <Link to="/" className="text-slate-200 hover:text-white transition font-medium">
          Marketplace
        </Link>

        {token && role === "brand" && (
          <>
            <Link to="/dashboard" className="text-slate-200 hover:text-white transition font-medium">
              Dashboard
            </Link>
            <Link to="/create-product" className="text-slate-200 hover:text-white transition font-medium">
              Create Product
            </Link>
            <Link to="/my-products" className="text-slate-200 hover:text-white transition font-medium">
              My Products
            </Link>
          </>
        )}

        {token && role === "customer" && (
          <Link to="/cart" className="text-slate-200 hover:text-white transition font-medium">
            Cart
          </Link>
        )}

        {!token && (
          <>
            <Link
              to="/login"
              className="bg-white text-slate-900 px-5 py-2 rounded-lg font-semibold hover:bg-slate-100 transition shadow-md"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition shadow-md"
            >
              Signup
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500/10 border border-red-500 text-red-400 px-5 py-2 rounded-lg font-semibold hover:bg-red-500/20 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}