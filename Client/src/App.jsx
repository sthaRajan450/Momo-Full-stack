import React, { useContext } from "react";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Profile from "./pages/Profile";
import AdminDashboard from "./Admin/AdminDashboard";
import UserManagement from "./Admin/UserManagement";
import ProductManagement from "./Admin/ProductManagement";
import { AuthContext } from "./context/AuthProvider";
import PageNotFound from "./pages/PageNotFound";
import AddProductForm from "./Admin/AddProductForm";
import ProductDescription from "./pages/ProductDescription";
import EditProductForm from "./Admin/EditProductForm";
import Cart from "./pages/Cart";
import Payment from "./payment/Payment";
import Success from "./payment/Success";
import OrderHistory from "./pages/OrderHistory";
import OrderManagement from "./Admin/OrderManagement";
import EditUser from "./Admin/EditUser";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<ProtectedRoutes compo={<Menu />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productDescription" element={<ProductDescription />} />
        <Route path="/cart" element={<ProtectedRoutes compo={<Cart />} />} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/orderHistory" element={<OrderHistory/>} />
        <Route path="/success/:id" element={<Success/>} />
        <Route path="/editProduct/:id" element={<EditProductForm />} />
        <Route path="/editUser/:id" element={<EditUser />} />
        <Route path="*" element={<PageNotFound />} />

        {user?.role == "admin" && (
          <Route path="/admin/" element={<AdminDashboard />}>
            <Route path="userManagement" element={<UserManagement />} />
            <Route index element={<UserManagement />} />
            <Route path="productManagement/" element={<ProductManagement />} />
            <Route path="orderManagement/" element={<OrderManagement />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
