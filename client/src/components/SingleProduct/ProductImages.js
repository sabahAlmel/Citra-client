import React, { useEffect, useState } from "react";
import style from "./ProductImages.module.css";

function ProductImages({ products, isLoading }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (products && products.fetchedProduct && products.fetchedProduct.images) {
      setSelectedImage(products.fetchedProduct.images[0]);
    }
  }, [products]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={style.allImages}>
      <div className={style.bigImage}>
        {selectedImage && (
          <img
            src={`${process.env.REACT_APP_BACKEND}${selectedImage}`}
            alt="big"
          />
        )}
      </div>
      <div className={style.imagesHandle}>
        {products.fetchedProduct.images?.map((image, index) => (
          <img
            key={index}
            src={`${process.env.REACT_APP_BACKEND}${image}`}
            alt={`mini${index + 1}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
}
export default ProductImages;
