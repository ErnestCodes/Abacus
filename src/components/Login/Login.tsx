import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e: any) => {
    e.preventDefault();
    // console.log(email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        if (userCredential) {
          navigate("/");
        }
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };
  const register = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // This means it succefully created a new user with email and password
        console.log(userCredential);

        if (userCredential) {
          navigate("/");
        }
      })
      .catch((error: any) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://abacus-47e6d.web.app/img/abacusis~2.jpg"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the Abacus Conditions of use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Intrest-Based Ads
          Notice.
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Abacus Account
        </button>
      </div>
    </div>
  );
}

export default Login;
