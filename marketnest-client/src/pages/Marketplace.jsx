import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import categories from "../constants/categories";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [page, category]);

  const fetchProducts = async () => {
  setLoading(true);

  try {

    const res = await api.get("/products", {
      params: {
        search,
        category,
        page,
        limit: 4
      }
    });

    setProducts(res.data.products);
    setTotalPages(res.data.totalPages);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  const dummyProducts = Array(8).fill(null).map((_, i) => ({
    _id: `dummy-${i}`,
    title: "Premium Product",
    category: "Electronics",
    price: "₹5,999",
    images: null
  }));

  const displayProducts = products.length > 0 ? products : dummyProducts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">

      {/* Search & Filter Section */}
      <div className="bg-white border-b border-blue-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 min-w-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No products found</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <Link
              key={product._id}
              to={products.length > 0 ? `/product/${product._id}` : "#"}
              className={`group bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden ${
                products.length === 0 ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={(e) => products.length === 0 && e.preventDefault()}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-gray-200 h-72 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <div className="text-gray-400 text-sm font-medium">No Image</div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition">
                  {product.title}
                </h2>

                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  {product.category}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900">
                    {product.price}
                  </p>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {products.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center gap-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    page === i + 1
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}