import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    const role = localStorage.getItem("role");

    if (role !== "customer") {
      alert("Only customers can add to cart");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = {
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0]
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse text-gray-400">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/500"}
                alt={product.title}
                className="w-full h-96 sm:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.title}-${idx}`}
                    onClick={() => setImageIndex(idx)}
                    className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 transition ${imageIndex === idx ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-block mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(248 reviews)</span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Price Section */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <p className="text-5xl font-bold text-gray-900 mb-2">
                  ₹{product.price.toLocaleString()}
                </p>
                <p className="text-gray-500 line-through">₹{Math.round(product.price * 1.2).toLocaleString()}</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                  <Truck className="text-blue-600 mb-2" size={24} />
                  <p className="text-xs text-gray-600 text-center">Free Delivery</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                  <Shield className="text-blue-600 mb-2" size={24} />
                  <p className="text-xs text-gray-600 text-center">Secure Payment</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                  <RotateCcw className="text-blue-600 mb-2" size={24} />
                  <p className="text-xs text-gray-600 text-center">Easy Return</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            {role === "customer" && (
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                  ♡
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}