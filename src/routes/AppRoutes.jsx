import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import AddProduct from "../pages/AddProduct";
import CreateOrder from "../pages/CreateOrder";
import Admin from "../pages/Admin";
import AIInsights from "../pages/AIInsights";
import OrderDetails from "../pages/OrderDetails";
import Invoice from "../pages/Invoice";
import Users from "../pages/Users";
import AdminProducts from "../pages/AdminProducts";
import Reports from "../pages/Reports";


import MainLayout from "../layouts/MainLayout";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/create-order" element={<CreateOrder />} />
                    <Route path="/ai-insights" element={<AIInsights />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />
                    <Route path="/invoice/:id" element={<Invoice />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/reports" element={<Reports />} />

                    <Route path="/admin" element={<Admin />} />

                </Route>

            </Routes>

        </BrowserRouter>

    )

}

export default AppRoutes;