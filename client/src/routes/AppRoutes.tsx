import { Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile} from "../pages/Profile";
import ProductPage from '../pages/ProductList';
import ProductDetails from "../pages/ProductDetail";
export function AppRoutes() {
return(
<>
    <Navbar />
    <Routes>
  <Route path="/" element={<Navigate to="/register" replace />} />
  <Route path="/products" element={<ProductPage />} />
  <Route path="/products/:id" element={<ProductDetails />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/profile" element={<Profile />} />
</Routes>
    <Footer />
</>
)
}

