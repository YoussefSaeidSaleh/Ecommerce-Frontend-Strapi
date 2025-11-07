"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";
import { nanoid } from "nanoid";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    setIsLoggedIn(window?.location?.href.toString().includes("sign-in"));
  }, []);

  const { user } = useUser();

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        res?.data?.data.forEach((citem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              documentId: citem.documentId,
              product: citem?.products,
            },
          ]);
        });
      }
    );
  };

  return (
    !isLoggedIn && (
      <header className="bg-white shadow-md">
        <div className="mx-auto flex h-[7vh] max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex gap-4">
                  <a
                    href="/sign-in"
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium
                   text-white transition hover:bg-teal-500"
                  >
                    Login
                  </a>

                  <a
                    href="/sign-in"
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-primary/75 sm:block"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <SignedIn>
                  <h2
                    className=" flex gap-1 cursor-pointer font-bold text-[17px] items-center select-none"
                    onClick={() => setOpenCart(!openCart)}
                  >
                    <ShoppingCart />({cart?.length})
                  </h2>
                  <UserButton afterSignOutUrl="/" />
                  {openCart && <Cart />}
                </SignedIn>
              )}
              <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
