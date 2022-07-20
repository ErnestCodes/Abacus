import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { createPaymentLink, getCartTotal } from "../features/cart/cartSlice";

export default function RedirectPage() {
  const { items, linkDetails } = useSelector((state: any) => state.cart);
  const totalAmount = getCartTotal(items);
  const names = [...items.map((item: any) => item.title)].toString();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(createPaymentLink({ totalAmount, names }));
  }, []);

  // window.location.href = linkDetails.paymentLink.url;
  window.open(linkDetails.paymentLink.url);

  // Render some text when redirecting
  // You can use a loading gif or something like that
  return (
    <div>
      <h3>Redirecting...</h3>
    </div>
  );
}
