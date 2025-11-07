"use client";

import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import { Trash2 } from "lucide-react";
import CartApis from "../_utils/CartApis";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount = totalAmount + Number(item?.product?.[0]?.price);
    });
    return totalAmount.toFixed(2);
  };

  const deleteCartItemFromList = (documentId) => {
    CartApis.deleteCartItem(documentId)
      .then((res) => {
        if (res) {
          setCart((oldCart) =>
            oldCart.filter((item) => item.documentId !== documentId)
          );
        } else {
          console.warn("Unexpected status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart?.map((item) => (
                <li
                  key={item?.product?.[0]?.banner?.url}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item?.product?.[0]?.banner?.url}
                    alt=""
                    className="w-28 h-16 sm:w-40 sm:h-24 rounded-md object-cover"
                  />

                  <div>
                    <h3 className="text-sm sm:text-xl text-gray-900 line-clamp-1 font-bold">
                      {item?.product?.[0]?.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] sm:text-[13px] text-gray-600">
                      <div>
                        <dt className="inline ">Category:</dt>
                        <dd className="inline">
                          {item?.product?.[0]?.category}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex items-center justify-end flex-1 gap-2 font-bold">
                    {item?.product?.[0]?.price}$
                  </div>

                  <button
                    onClick={() => deleteCartItemFromList(item?.documentId)}
                    className="text-gray-600 transition hover:text-red-600"
                  >
                    <span className="sr-only">Remove item</span>

                    <Trash2 className="size-5 sm:size-6" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex w-full border-t border-gray-100 pt-8">
              <div className="w-screen space-y-4">
                <dl className="space-y-0.5 text-gray-700 text-xl">
                  <div className="flex justify-between font-bold">
                    <dt>Total</dt>
                    <dd>${getTotalAmount()}</dd>
                  </div>
                </dl>

                <div className="flex justify-end cursor-pointer ">
                  <button
                    onClick={() =>
                      router.push(`/checkout?amount=${getTotalAmount()}`)
                    }
                    className="block w-full sm:w-auto text-center rounded-md bg-gray-700 px-5 py-3 
                    text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <h2 className="text-gray-400 text-[14px] text-center">
              Note: All Items will be sent via Email
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
