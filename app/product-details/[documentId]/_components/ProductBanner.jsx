import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductBanner = ({ product, isLoading }) => {
  const imageUrl = product?.banner?.url;

  if (isLoading) {
    // عرض Skeleton بدلاً من الصورة
    return <Skeleton height={220} width={400} borderRadius={8} />;
  }

  if (!imageUrl) return null;

  return (
    <div>
      <Image
        src={imageUrl}
        alt="product-details-banner"
        width={400}
        height={400}
        className="rounded-lg"
      />
    </div>
  );
};

export default ProductBanner;
