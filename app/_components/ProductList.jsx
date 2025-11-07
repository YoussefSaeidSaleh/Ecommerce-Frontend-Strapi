import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ productList, className }) => {
  const gridClasses = `grid md:grid-cols-2 lg:grid-cols-3  gap-3 ${
    className || "xl:grid-cols-4"
  }`;
  return (
    <div className={gridClasses}>
      {productList.map((item) => (
        <ProductItem product={item} key={item?.id} />
      ))}
    </div>
  );
};

export default ProductList;
