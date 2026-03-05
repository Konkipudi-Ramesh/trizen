import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import categories from "../constants/categories";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("status", status);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Product created successfully");
      navigate("/my-products");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImages([]);
    } catch (error) {
      console.log(error);
      alert("Error creating product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
            <h2 className="text-4xl font-bold text-white mb-2">
              Create Product
            </h2>
            <p className="text-blue-100 text-sm font-medium">
              List your product and reach thousands of customers
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title
              </label>
              <input
                type="text"
                placeholder="Enter product title"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe your product in detail"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none h-28"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Grid Layout for Price & Category */}
            <div className="grid grid-cols-2 gap-6">
              {/* Price Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Images
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setImages(e.target.files)}
                />
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-8-12l-3.172-3.172a4 4 0 00-5.656 0L12 12m16-4v8m0 0v8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 duration-200 mt-8"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}