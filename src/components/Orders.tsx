import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterSection from "./FooterSection";
import NavHeader from "./NavHeader";
import truncate from "../utils/truncate";
import { collection, doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import OrderItem from "./OrderItem";

function Orders() {
  const { user } = useSelector((state: any) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        collection(db, "users", user.uid, "orders"),
        (snapshot: DocumentData) => {
          setOrders(
            snapshot.docs.map((doc: any) => ({
              id: doc.id,
              data: doc.data() as any,
            }))
          );
        }
      ),

    [user]
  );

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
            {orders?.map((order: any, index) => (
              <OrderItem item={order} key={index} />
            ))}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}

export default Orders;
