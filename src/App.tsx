import React, { useEffect } from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import routes from "./routes";
import LoginAdmin from "./components/Admin/Layout/Login.admin";
import HomeAdmin from "./components/Admin/Home/Home.admin";
import Users from "./components/Admin/Layout/Users";
import Products from "./components/Admin/Layout/Products";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";
// import setAuthToken from "./utils/setAuthToken";
// import { AppDispatch, store } from "./app/store";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import NewProducts from "./components/Admin/Layout/NewProducts";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import AuthError from "./components/AuthError";
import { loadingUser } from "./features/user/userSlice";
import RedirectPage from "./components/RedirectPage";
import Toc from "./components/Toc";

injectStyle();

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const data = queryParams.get("data") as any;
  const detail = queryParams.get("detail") as any;
  if (detail) {
    localStorage.setItem("userRefresh", detail);
  }

  if (data) {
    localStorage.setItem("userAccess", data);
  }

  const { isSuccess, accessToken, refreshToken } = useSelector(
    (state: any) => state.auth
  );

  // const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.user);

  // dispatch(loadingUser()) as any;

  return (
    <>
      <Router>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.loginAdmin} element={<LoginAdmin />} />
          <Route path={routes.toc} element={<Toc/>} />
          <Route
            path={routes.order}
            element={user ? <Orders /> : <Navigate to="/" />}
          />
          <Route
            path={routes.cart}
            element={user ? <Cart /> : <Navigate to="/" />}
          />
          <Route
            path={routes.dashboard}
            element={accessToken ? <HomeAdmin /> : <Navigate to="/" />}
          />
          <Route
            path={routes.new}
            element={accessToken ? <NewProducts /> : <Navigate to="/" />}
          />
          <Route path="/payment" element={<RedirectPage />} />
          <Route
            path={routes.users}
            element={accessToken ? <Users /> : <Navigate to="/" />}
          />
          <Route
            path={routes.products}
            element={accessToken ? <Products /> : <Navigate to="/" />}
          />
          <Route path={routes.authError} element={<AuthError />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
