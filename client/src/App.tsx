import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import routes from "./routes";
import LoginAdmin from "./components/Admin/Layout/Login.admin";
import HomeAdmin from "./components/Admin/Home/Home.admin";
import Users from "./components/Admin/Layout/Users";
import Products from "./components/Admin/Layout/Products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from "./utils/setAuthToken";
import { AppDispatch, store } from "./app/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/auth/authSlice";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.loginAdmin} element={<LoginAdmin />} />
          <Route path={routes.dashboard} element={<HomeAdmin />} />
          <Route path={routes.users} element={<Users />} />
          <Route path={routes.products} element={<Products />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
