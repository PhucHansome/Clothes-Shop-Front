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
import Product from "./components/manager/product/Product.js";


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
          <Route path="/manager/customer" element={<Product />} />
          <Route path="/manager/order" element={<Product />} />
        </Routes>
      </React.Fragment>
    </CookiesProvider>
  );
}

export default Manager;
