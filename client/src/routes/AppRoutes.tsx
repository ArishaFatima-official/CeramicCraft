import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export function AppRoutes() {
return(
<BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" />
        <Route path="/products" />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/cart" />
        <Route path="/checkout" />
        <Route path="/orders" />
        <Route path="/profile" />
    </Routes>
    <Footer />
</BrowserRouter>
)
}

