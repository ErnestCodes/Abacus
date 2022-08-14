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
import { injectStyle } from "react-toastify/dist/inject-style";
import { useDispatch, useSelector } from "react-redux";
import NewProducts from "./components/Admin/Layout/NewProducts";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import AuthError from "./components/AuthError";
import RedirectPage from "./components/RedirectPage";
import Toc from "./components/Toc";
import Policy from "./components/Policy";
import Login from "./components/Login/Login";
import {
  getRedirectResult,
  GoogleAuthProvider,
  OAuthCredential,
} from "firebase/auth";
import { auth } from "./firebase";
import { setUser, userError } from "./features/user/userSlice";

injectStyle();

function App() {
  // const queryParams = new URLSearchParams(window.location.search);
  // const data = queryParams.get("data") as any;
  // const detail = queryParams.get("detail") as any;
  const dispatch = useDispatch();
  useEffect(() => {
    getRedirectResult(auth)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(
          result
        ) as OAuthCredential;
        const token = credential.accessToken as any;

        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("userAccess", token);
        localStorage.setItem("userRefresh", user.refreshToken);

        dispatch(setUser(user));
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        dispatch(userError(errorMessage));
      });
  }, []);

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
          {/* <Route path={routes.login} element={<Login />} /> */}
          <Route path={routes.loginAdmin} element={<LoginAdmin />} />
          <Route path={routes.toc} element={<Toc />} />
          <Route path={routes.policy} element={<Policy />} />
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
