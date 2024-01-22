import React, { useState } from "react";
import mini1 from "./Rectangle 4.png";
import mini2 from "./image.png";
import mini3 from "./Rectangle 5.png";
import big1 from "./Rectangle 4.png";
import style from "./ProductImages.module.css";
function ProductImages() {
  let products = [
    {
      details: { color: "black", size: "xl", type: "men's wear" },
      _id: "65a3e1be15c60f6e0ccaca75",
      name: "product 2",
      price: 200,
      serialNumber: "1",
      images: [big1, mini1, mini2, mini3, mini1],
      subCategoryID: "65a1802af2a3f8191855d4eb",
      categoryID: "65a17e21f2a3f8191855d4e6",
      categoryName: "accessories",
      quantity: 10,
      createdAt: "2024-01-14T13:29:34.861Z",
      updatedAt: "2024-01-14T13:29:34.861Z",
      __v: 0,
    },
  ];
  const [selectedImage, setSelectedImage] = useState(products[0].images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className={style.allImages}>
      <div className={style.bigImage}>
        <img src={selectedImage} alt="big1" />
      </div>
      <div className={style.imagesHandle}>
        {products[0].images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`mini${index + 1}`}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
}
export default ProductImages;
