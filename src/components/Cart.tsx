import { Fragment, useEffect, useState } from "react";
import { products } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { getAllProducts } from "../features/products/productSlice";
import { loadingUser } from "../features/user/userSlice";
import FooterSection from "./FooterSection";
import NavHeader from "./NavHeader";
import Checkout from "./Checkout";

function Cart() {
  const { user, isSuccess, accessToken, refreshToken } = useSelector(
    (state: any) => state.user
  );

  const { items } = useSelector((state: any) => state.cart);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProducts()) as any;

    if (isSuccess || accessToken || refreshToken) {
      dispatch(loadingUser()) as any;
    }
  }, [products, user, dispatch]);

  return (
    <div className="bg-white">
      <NavHeader />
      <Checkout />
      <FooterSection />
    </div>
  );
}

export default Cart;
