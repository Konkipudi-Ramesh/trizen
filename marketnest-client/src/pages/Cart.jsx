import { useEffect, useState } from "react";
import api from "../services/api";
import { Trash2, ShoppingCart } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const validItems = [];

    for (let item of cart) {
      try {
        const res = await api.get(`/products/${item._id}`);
        if (res.data && res.data.status === "published") {
          validItems.push(item);
        }
      } catch (error) {
        console.log("Product removed from marketplace:", item._id);
      }
    }

    localStorage.setItem("cart", JSON.stringify(validItems));
    setCartItems(validItems);
    setLoading(false);
  };

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <ShoppingCart className="w-8 h-8 text-slate-900" />
          <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-lg text-slate-500">Your cart is empty</p>
            <p className="text-sm text-slate-400 mt-2">Add items to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Products Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {item.title}
                      </h2>

                      <div className="flex items-end justify-between mb-6">
                        <span className="text-3xl font-bold text-slate-900">
                          ₹{item.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sticky top-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">₹{totalPrice.toLocaleString()}</span>
                </div>

                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}