import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import NewProducts from "./components/Admin/Layout/NewProducts";

function App() {
  const { isSuccess, accessToken, refreshToken } = useSelector(
    (state: any) => state.auth
  );
  return (
    <>
      <Router>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.loginAdmin} element={<LoginAdmin />} />
          <Route
            path={routes.dashboard}
            element={accessToken ? <HomeAdmin /> : <Navigate to="/" />}
          />
          <Route
            path={routes.new}
            element={accessToken ? <NewProducts /> : <Navigate to="/" />}
          />
          <Route
            path={routes.users}
            element={accessToken ? <Users /> : <Navigate to="/" />}
          />
          <Route
            path={routes.products}
            element={accessToken ? <Products /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
