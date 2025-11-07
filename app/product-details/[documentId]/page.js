"use client";
import React, { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import ProductApis from "../../_utils/ProductApis";
import BreadCrumb from "../../_components/BreadCrumb";

export default function ProductDetails({ params }) {
  const path = usePathname();
  const { documentId } = use(params);

  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.category)
      .then((res) => {
        const allProducts = res?.data?.data || [];
        const filteredList = allProducts.filter(
          (item) => String(item.id) !== String(product.id)
        );
        setProductList(filteredList);
      })
      .catch((err) => {
        console.error("Error fetching similar products:", err);
        setProductList([]);
      });
  };

  const getProductById_ = () => {
    setIsLoading(true);

    ProductApis.getProductById(documentId)
      .then((res) => {
        const prod = res.data.data;
        setProductDetails(prod);
        getProductListByCategory(prod);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProductById_();
  }, [documentId]);

  return (
    <div className="px-10 md:px-12 lg:px-28 xl:px-48 2xl:px-72 py-8">
      <BreadCrumb path={path} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-around mt-10">
        <ProductBanner product={productDetails} isLoading={isLoading} />
        <ProductInfo product={productDetails} isLoading={isLoading} />
      </div>

      {productList.length > 0 && (
        <div>
          <h2 className="mt-24 mb-4 text-xl font-bold">Similar Products</h2>
          <ProductList className="xl:grid-cols-3" productList={productList} />
        </div>
      )}
    </div>
  );
}
