import React from "react";
import imag from "../../assets/images/image.jpeg";
import ProductCard from "./productCard";
import style from "../productSection/productSection.module.css";
const productData = [
  { id: 1, image: imag, description: "Product 1 Description", price: 19.99 },
  { id: 2, image: imag, description: "Product 2 Description", price: 29.99 },
  { id: 3, image: imag, description: "Product 3 Description", price: 39.99 },
  { id: 4, image: imag, description: "Product 4 Description", price: 49.99 },
  { id: 5, image: imag, description: "Product 5 Description", price: 59.99 },
  { id: 6, image: imag, description: "Product 6 Description", price: 69.99 },
  { id: 7, image: imag, description: "Product 7 Description", price: 79.99 },
  { id: 8, image: imag, description: "Product 8 Description", price: 78.99 },
];

const ProductSection = () => {
  return (
    <section id="ourproducts" className={style.contentsection}>
      <h2 className={style.title}>منتجاتنا</h2>
      <div className={style.cardContainer}>
        {productData.map((item, index) => (
          <ProductCard key={item.id} image={imag} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
