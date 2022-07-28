import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentLink,
  getCartTotal,
  remove,
} from "../features/cart/cartSlice";
// import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { AppDispatch } from "../app/store";
import { Link } from "react-router-dom";
import { createOrders } from "../features/orders/OrderSlice";

export default function Checkout() {
  const { items, linkDetails } = useSelector((state: any) => state.cart);
  let { user } = useSelector((state: any) => state.user);
  const email = user.email;
  const totalAmount = getCartTotal(items);
  const names = [...items.map((item: any) => item.title)].toString();
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(createPaymentLink({ totalAmount, names }));
  // }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
          Your Cart
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {items.map((item: any) => (
                <li key={item.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-24 rounded-md object-center object-cover sm:w-40 sm:h-32"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a
                            href="#"
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {item.title}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex-1 flex items-end justify-between">
                      <div className="ml-4">
                        <button
                          type="button"
                          onClick={() => dispatch(remove(item.id))}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${getCartTotal(items)}
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">Proceed to checkout</p>
            </div>

            <div className="mt-10">
              <Link
                to="/payment"
                // rel="noreferrer"
                // target="_blank"
                className="w-full text-center bg-[#f0c14b] border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
                onClick={() => {
                  dispatch(createPaymentLink({ names, totalAmount, items }));
                  dispatch(createOrders({ items, email }));
                  // if (linkDetails) {
                  //   window.open(linkDetails.paymentLink.url);
                  //   // window.location.href = linkDetails.paymentLink.url;
                  // }
                }}
              >
                Checkout
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
