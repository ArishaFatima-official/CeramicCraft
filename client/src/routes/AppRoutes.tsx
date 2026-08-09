import { Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile} from "../pages/Profile";
import ProductPage from '../pages/ProductList';
import ProductDetails from "../pages/ProductDetail";
import CartPage from '../pages/Cart';
import CheckoutPage from '../pages/Checkout';
import OrdersPage from '../pages/OrderHistory';
import OederDetailPage from '../pages/OrderDetailPage';
import AdminDashboard from "../pages/admin/AdminDashboard"
import AddProduct from "../pages/admin/AddProduct";
import AdminProducts from "../pages/admin/AdminProducts";

export function AppRoutes() {
return(
<>
    <Navbar />
    <Routes>
  <Route path="/" element={<Navigate to="/register" replace />} />
   <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/products" element={<ProductPage />} />
  <Route path="/products/:id" element={<ProductDetails />} />
   <Route path="/cart" element={<CartPage />} />
   <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/orders" element={<OrdersPage />} />
     <Route path="/orders/:id" element={<OederDetailPage />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/admin/products" element={<AdminProducts />}/>
  <Route path="/admin/products/add"  element={<AddProduct/>}/>
</Routes>
    <Footer />
</>
)
}

