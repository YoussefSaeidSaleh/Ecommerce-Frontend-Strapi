"use client";

import { useUser } from "@clerk/nextjs";
import { BadgeCheck, CircleOff, List, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import CartApis from "../../../_utils/CartApis";
import { CartContext } from "../../../_context/CartContext";

const ProductInfo = ({ product, isLoading }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const data = {
      data: {
        username: user.fullName, // صحح الاسم
        email: user.primaryEmailAddress.emailAddress,
        products: [product.documentId], // صحح للاسم الصحيح
      },
    };

    CartApis.addToCart(data)
      .then((res) => {
        setCart((oldCart) => [
          ...oldCart,
          {
            documentId: res?.data?.data?.documentId,
            product: [product],
          },
        ]);
      })
      .catch((error) => {
        console.log("error", error.response?.data || error.message);
      });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 w-full">
        {/* عنوان المنتج */}
        <Skeleton height={30} width="50%" />
        {/* الفئة */}
        <Skeleton height={22.5} width="30%" />
        {/* سطرين وصف */}
        <Skeleton count={2} height={16} width="100%" />
        {/* حالة الـ badge */}
        <Skeleton height={16} width="30%" />
        {/* السعر */}
        <Skeleton height={40} width="25%" />
        {/* زر “Add to cart” */}
        <Skeleton height={48} width="25%" borderRadius={6} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[20px]">{product.title}</h2>
      <h2 className="text-[15px] text-gray-400 flex gap-1 items-center">
        <List className="w-5 h-5" />
        {product.category}
      </h2>
      <h2 className="text-[15px] mt-5">
        {product.description?.[0]?.children?.[0]?.text}
      </h2>
      <h2 className="text-[11px] text-gray-500 flex gap-2 mt-2 items-center">
        {product.instantDelivery ? (
          <BadgeCheck className="w-4 h-4 text-green-500" />
        ) : (
          <CircleOff className="w-4 h-4 text-red-500" />
        )}
        Eligible For Instant
      </h2>
      <h2 className="text-[32px] text-primary mt-3 font-bold">
        ${product.price}
      </h2>
      <button
        onClick={() => handleAddToCart()}
        className="flex gap-2 bg-primary hover:bg-teal-600 p-3 rounded-lg
         text-white transition-colors duration-500 ease-in-out"
      >
        <ShoppingCart /> Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
