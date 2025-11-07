import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  return (
    <div
      className="  absolute mx-10 right-[-37px] sm:right-14 top-14 p-5 overflow-auto h-[475px]
       shadow-sm w-screen  max-w-sm border z-10  bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 rounded-md"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.map((item) => (
            <li key={item?.id} className="flex items-center gap-4">
              <img
                src={item?.product?.[0]?.banner?.url}
                alt=""
                className="w-24 h-16 rounded-md object-cover"
              />
              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {item?.product?.[0]?.title}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category:</dt>
                    <dd className="inline">{item?.product?.[0]?.category}</dd>
                  </div>

                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline font-bold">
                      {item?.product?.[0]?.price}$
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2">
                <button className="text-gray-600 transition hover:text-red-600">
                  <span className="sr-only">Remove item</span>

                  <Trash2 className="size-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded-md border border-gray-600 px-5 
            py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({cart.length})
          </Link>

          <a
            href="#"
            className="block rounded-md bg-gray-700 px-5 py-3 text-sm
            text-gray-100 transition hover:bg-gray-600 "
          >
            Checkout
          </a>

          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline 
            underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
