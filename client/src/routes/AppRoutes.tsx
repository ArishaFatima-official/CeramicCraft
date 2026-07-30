import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export function AppRoutes() {
return(
<>
    <Navbar />
    <Routes>
  <Route path="/" element={<Navigate to="/register" replace />} />

  <Route path="/register" element={<Register />} />

  <Route path="/login" element={<Login />} />

</Routes>
    <Footer />
</>
)
}

