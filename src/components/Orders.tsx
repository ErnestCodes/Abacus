import { Fragment, useEffect, useState } from "react";
import { Popover, Transition, Dialog, Tab } from "@headlessui/react";
import { products, navigation } from "../utils/data";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { getAllProducts } from "../features/products/productSlice";
import getGoogleOAuthURL from "../utils/getGoogleUrl";
import { loadingUser } from "../features/user/userSlice";
import FooterSection from "./FooterSection";
import { Link } from "react-router-dom";
import routes from "../routes";
import NavHeader from "./NavHeader";
import truncate from "../utils/truncate";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Orders() {
  const [open, setOpen] = useState(false);
  const { user, isSuccess, accessToken, refreshToken } = useSelector(
    (state: any) => state.user
  );

  const { order, orderSuccess } = useSelector((state: any) => state.order);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProducts()) as any;
    // if (isSuccess || accessToken || refreshToken) {
    dispatch(loadingUser()) as any;
    // }
  }, [products, user, dispatch]);

  // if (orderSuccess) {
  //   console.log(order);
  // }

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      {/** Mobile Navigation */}
      <NavHeader />

      <main className="max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Order placed{" "}
            {/* <time dateTime="2021-03-22" className="font-medium text-gray-900">
              March 22, 2021
            </time> */}
          </p>
        </div>

        {/* Products */}
        <section aria-labelledby="products-heading" className="mt-6">
          <h2 id="products-heading" className="sr-only">
            Products purchased
          </h2>

          <div className="space-y-8">
            {user.orders.map((item: any) => (
              <div
                key={item.id}
                className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
              >
                <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                  <div className="sm:flex lg:col-span-7">
                    <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                      <img
                        src={item.image}
                        className="w-full h-full object-center object-contain sm:w-full sm:h-full"
                      />
                    </div>

                    <div className="mt-6 sm:mt-0 sm:ml-6">
                      <h3 className="text-base font-medium text-gray-900">
                        <a href={item.image}>{item.title}</a>
                      </h3>
                      <h3 className="text-base mt-2 font-medium text-gray-900">
                        <a href="#">Order ID: {`product_${item.id}`}</a>
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        ${parseInt(item.price + "00")}
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        {truncate(item.description, 35)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}

export default Orders;
