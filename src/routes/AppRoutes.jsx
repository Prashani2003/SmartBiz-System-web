import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import AddProduct from "../pages/AddProduct";
import CreateOrder from "../pages/CreateOrder";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/add-product" element={<AddProduct />} />

        <Route path="/create-order" element={<CreateOrder />} />


      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;