import React from "react";
import truncate from "../utils/truncate";

function OrderItem({ item }: { item: any }) {
  return (
    <>
      {item.data.basket?.map((data: any) => (
        <div
          key={data.id}
          className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
        >
          <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
            <div className="sm:flex lg:col-span-7">
              <div className="flex-shrink-0 w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40">
                <img
                  src={data.image}
                  className="w-full h-full object-center object-contain sm:w-full sm:h-full"
                />
              </div>

              <div className="mt-6 sm:mt-0 sm:ml-6">
                <h3 className="text-base font-medium text-gray-900">
                  <a href={data.image}>{data.title}</a>
                </h3>
                <h3 className="text-sm mt-2 font-normal text-gray-900">
                  <a href="#">Order ID: {`product_${data.id}`}</a>
                </h3>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  ${parseInt(data.price + "00")}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  {truncate(data.description, 35)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OrderItem;
