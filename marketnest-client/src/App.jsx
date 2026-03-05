import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import MyProducts from "./pages/MyProducts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Marketplace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute role="brand">
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/create-product"
  element={
    <ProtectedRoute role="brand">
      <CreateProduct />
    </ProtectedRoute>
  }
/>

        <Route
  path="/my-products"
  element={
    <ProtectedRoute role="brand">
      <MyProducts />
    </ProtectedRoute>
  }
/>
        <Route path="/product/:id" element={<ProductDetails />} />
       <Route
  path="/edit-product/:id"
  element={
    <ProtectedRoute role="brand">
      <EditProduct />
    </ProtectedRoute>
  }
/>
<Route
  path="/cart"
  element={
    <ProtectedRoute role="customer">
      <Cart />
    </ProtectedRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;