import React, { useEffect, useState } from "react";
import style from "./ProductImages.module.css";
import placeholder from "../../assets/images/hijabi3.jpg";
import LoadingPage from "../loadingPage";

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
    return <LoadingPage />;
  }

  return (
    <div className={style.allImages}>
      <div className={style.bigImage}>
        {selectedImage ? (
          <img
            src={`${process.env.REACT_APP_BACKEND}${selectedImage}`}
            alt="big"
          />
        ) : (
          <img src={placeholder} alt="placeholder" />
        )}
      </div>
      <div className={style.imagesHandle}>
        {products.fetchedProduct.images
          ? products.fetchedProduct.images.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_BACKEND}${image}`}
                alt={`mini${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
export default ProductImages;
