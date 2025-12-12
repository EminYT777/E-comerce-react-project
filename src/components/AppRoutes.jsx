import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import Reviews from "../pages/Reviews";
import UserProducts from "../pages/UserProducts";
import Profile from "../pages/Profile";
import ProductForm from "../pages/ProductForm";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />

                <Route path="shop" element={<Shop />} />
                <Route path="products/:id" element={<Product />} />

                <Route path="cart" element={<Cart />} />

                <Route path="checkout" element={<Checkout />} />

                <Route path="about" element={<About />} />

                <Route path="contact" element={<Contact />} />

                <Route path="reviews" element={<Reviews />} />

                <Route path="user-products" element={<UserProducts />} />
                 

                 <Route path="/profile" element={<Profile />} />

                 <Route path="product-form" element={<ProductForm />} />
 

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
}
