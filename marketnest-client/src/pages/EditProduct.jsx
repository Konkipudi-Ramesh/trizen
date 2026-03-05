import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import categories from "../constants/categories";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/products/${id}`,
        {
          title,
          description,
          price,
          category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Product updated successfully");
      navigate("/my-products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
          Edit Product
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter product title"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter product description"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter price"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}