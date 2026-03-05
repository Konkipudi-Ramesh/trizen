import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { Trash2, Edit, CheckCircle, Circle } from "lucide-react";

export default function MyProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.get("/products/my-products", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(res.data || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await api.put(
      `/products/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">

      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            My Products
          </h1>
          <p className="text-slate-600 text-lg">Manage and monitor your product catalog</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map((product) => (

              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-blue-200"
              >

                <div className="relative overflow-hidden bg-slate-200 h-56">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">

                  <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                    {product.title}
                  </h2>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-blue-600">₹ {product.price}</span>
                  </div>

                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all
                      ${
                        product.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : product.status === "draft"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status === "published" ? (
                        <CheckCircle size={16} />
                      ) : (
                        <Circle size={16} />
                      )}
                      <span className="capitalize">{product.status}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    <Link
                      to={`/edit-product/${product._id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Edit size={18} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>

                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    {product.status !== "published" && (
                      <button
                        onClick={() => updateStatus(product._id, "published")}
                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        ✓ Publish
                      </button>
                    )}

                    {product.status === "published" && (
                      <button
                        onClick={() => updateStatus(product._id, "draft")}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        ◯ Move to Draft
                      </button>
                    )}
                  </div>

                </div>

              </div>

            ))}

          </div>
        )}
      </div>

    </div>
  );
}