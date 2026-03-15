import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Admin from "../pages/Admin";

import MainLayout from "../layouts/MainLayout";

function AppRoutes(){

 return(

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>

    <Route element={<MainLayout/>}>

     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/products" element={<Products/>}/>
     <Route path="/orders" element={<Orders/>}/>

     <Route path="/admin" element={<Admin/>}/>

    </Route>

   </Routes>

  </BrowserRouter>

 )

}

export default AppRoutes;