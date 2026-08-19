import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile } from "../pages/Profile";

import Home from "../pages/Home";
import ProductPage from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetail";
import CartPage from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import OrdersPage from "../pages/OrderHistory";
import OederDetailPage from "../pages/OrderDetailPage";

import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";

import ProtectedRoute from "../components/common/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>

      {/* USER */}
      <Route element={<UserLayout />}>

        {/* PUBLIC */}
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/products"
          element={<ProductPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />


        {/* LOGIN REQUIRED */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/orders/:id"
            element={<OederDetailPage />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Route>


      {/* ADMIN */}
      <Route element={<ProtectedRoute adminOnly />}>

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="products/add"
            element={<AddProduct />}
          />

          <Route
            path="products/edit/:id"
            element={<EditProduct />}
          />

          <Route
            path="categories"
            element={<AdminCategories />}
          />

        </Route>

      </Route>

    </Routes>
  );
}


const UserLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};