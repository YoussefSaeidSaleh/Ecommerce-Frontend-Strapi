"use client";
import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductApis from "../_utils/ProductApis";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const ProductSection = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getLatestProducts_();
  }, []);
  const getLatestProducts_ = () => {
    ProductApis.getLatestProducts().then((res) => {
      setProductList(res.data.data);
    });
  };

  return (
    <div className="px-5 md:px-24 xl:px-32">
      <h2 className="font-bold text-[25px] my-3">
        Brand New
        <span
          className="font-normal text-[16px]
         float-right text-primary flex 
         items-center cursor-pointer hover:text-teal-600"
        >
          View All Collection <ArrowRight className="h-4" />
        </span>
      </h2>
      <ProductList productList={productList} />
    </div>
  );
};

export default ProductSection;
