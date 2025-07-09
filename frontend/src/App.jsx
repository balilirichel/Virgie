import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import SideNav from "./Components/SideNav";
import ProtectedRouteAdmin from "./Components/ProtectedRouteAdmin";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Subcategory from "./Pages/Subcategory";
import Product from "./Pages/Product";
import Error from "./Pages/Error";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Members from "./Pages/Members";
import AllProducts from "./Pages/AllProducts";
import SearchPage from "./Pages/SearchPage";
import Likes from "./Pages/Likes";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Orders from "./Pages/Orders";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/products/subcategory/Brow Liner"
          element={<Subcategory category="Brow Liner" />}
        />
        <Route
          path="/products/subcategory/Brow Mascara"
          element={<Subcategory category="Brow Mascara" />}
        />
        <Route
          path="/products/subcategory/Brow Pencil"
          element={<Subcategory category="Brow Pencil" />}
        />
        <Route
          path="/products/subcategory/Eyeliner Pencil"
          element={<Subcategory category="Eyeliner Pencil" />}
        />
        <Route
          path="/products/subcategory/Eyeshadow Pallete"
          element={<Subcategory category="Eyeshadow Pallete" />}
        />
        <Route
          path="/products/subcategory/Liner Liquid"
          element={<Subcategory category="Liner Liquid" />}
        />
        <Route
          path="/products/subcategory/Liner Mechanic"
          element={<Subcategory category="Liner Mechanic" />}
        />
        <Route
          path="/products/subcategory/Liner Pencil"
          element={<Subcategory category="Liner Pencil" />}
        />
        <Route
          path="/products/subcategory/Mascara"
          element={<Subcategory category="Mascara" />}
        />
        <Route
          path="/products/subcategory/Blush Powder"
          element={<Subcategory category="Blush Powder" />}
        />
        <Route
          path="/products/subcategory/Cheek Tint"
          element={<Subcategory category="Cheek Tint" />}
        />
        <Route
          path="/products/subcategory/Concealer Liquid"
          element={<Subcategory category="Concealer Liquid" />}
        />
        <Route
          path="/products/subcategory/Dual Powder Foundation"
          element={<Subcategory category="Dual Powder Foundation" />}
        />
        <Route
          path="/products/subcategory/Foundation Cream"
          element={<Subcategory category="Foundation Cream" />}
        />
        <Route
          path="/products/subcategory/Foundation Cream to Powder"
          element={<Subcategory category="Foundation Cream To Powder" />}
        />
        <Route
          path="/products/subcategory/Foundation Liquid"
          element={<Subcategory category="Foundation Liquid" />}
        />
        <Route
          path="/products/subcategory/Pressed Powder"
          element={<Subcategory category="Pressed Powder" />}
        />
        <Route
          path="/products/subcategory/Lip Balm"
          element={<Subcategory category="Lip Balm" />}
        />
        <Route
          path="/products/subcategory/Lipstick"
          element={<Subcategory category="Lipstick" />}
        />
        <Route
          path="/products/subcategory/Liquid Lip Color"
          element={<Subcategory category="Liquid Lip Color" />}
        />
        <Route path="/likes" element={<Likes />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/products/:productId" element={<Product />} />

        <Route path="*" element={<Error />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/allproducts" element={<AllProducts />} />
        </Route>
        <Route path="/searchpage" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
