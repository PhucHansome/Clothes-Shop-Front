import Login from "./components/manager/login/Login.js";
import Register from "./components/manager/register/register";
import { Routes, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import Home from "./components/manager/homePage/Home";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.min.css";
import "./assets/css/app.min.css";
import Product from "./components/manager/product/productList/ProductList.js";
import AddProduct from "./components/manager/product/addProduct/AddProduct.js";
import EditProduct from "./components/manager/product/editProduct/EditProduct"
import ViewProduct from "./components/manager/product/viewProduct/ViewProduct.js";
import CustomerList from "./components/manager/customer/customerList/CustomerList.js";
import AddCustomer from "./components/manager/customer/addCustomer/AddCustomer.js";
import EditCustomer from "./components/manager/customer/editCustomer/EditCustomer.js";
import ViewCustomer from "./components/manager/customer/viewCustomer/ViewCustomer.js";

function Manager() {
  return (
    <CookiesProvider>
      <React.Fragment>
        <ToastContainer position="top-right" autoClose={4000} />
        <Routes>
          <Route path="/manager/login"  element={<Login />} />
          <Route path="/manager" exact element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manager/product" element={<Product />} />
          <Route path="/manager/product/add" element={<AddProduct />} />
          <Route path="/manager/product/edit/:slugProduct" element={<EditProduct />} />
          <Route path="/manager/product/view/:slugProduct" element={<ViewProduct />} />
          <Route path="/manager/customer" element={<CustomerList />} />
          <Route path="/manager/customer/add" element={<AddCustomer />} />
          <Route path="/manager/customer/edit/:id" element={<EditCustomer />} />
          <Route path="/manager/customer/view/:id" element={<ViewCustomer />} />
          <Route path="/manager/order" element={<Product />} />
        </Routes>
      </React.Fragment>
    </CookiesProvider>
  );
}

export default Manager;
