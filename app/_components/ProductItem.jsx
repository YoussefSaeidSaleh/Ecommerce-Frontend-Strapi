import { List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product }) => {
  return (
    <Link
      href={`/product-details/${product?.documentId}`}
      className="p-1 border-teal-500 rounded-lg hover:border hover:shadow-md hover:cursor-pointer"
    >
      <div className="relative w-full h-[200px]">
        <Image
          src={product?.banner?.url}
          alt="banner-card"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-t-lg object-cover"
        />
      </div>

      <div className="flex justify-between p-3 items-center bg-gray-50 rounded-b-lg">
        <div className="">
          <h2 className="text-[16px] font-medium line-clamp-1">
            {product?.title}
          </h2>
          <h2 className="text-[12px] text-gray-400 flex gap-1 items-center">
            <List className="w-4 h-4" />
            {product?.category}
          </h2>
        </div>
        <h2 className="text-[17px] font-bold">{product?.price}$</h2>
      </div>
    </Link>
  );
};

export default ProductItem;
