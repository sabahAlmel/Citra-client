import React from "react";
import imag from "../../assets/images/hijabi2.jpg";
import imag1 from "../../assets/images/hijabi3.jpg";
import imag2 from "../../assets/images/hijab.jpg";
import imag3 from "../../assets/images/hijabiCard.jpg";

import style from "../productSection/productSection.module.css";
import { motion } from "framer-motion";

const productData = [
  { id: 1, image: imag, description: "Product 1 Description", price: 19.99 },
  { id: 2, image: imag2, description: "Product 2 Description", price: 29.99 },
  { id: 3, image: imag1, description: "Product 3 Description", price: 39.99 },
  { id: 4, image: imag3, description: "Product 4 Description", price: 49.99 },
  { id: 5, image: imag1, description: "Product 5 Description", price: 59.99 },
  { id: 6, image: imag3, description: "Product 6 Description", price: 69.99 },
  { id: 7, image: imag2, description: "Product 7 Description", price: 79.99 },
  { id: 8, image: imag1, description: "Product 8 Description", price: 78.99 },
];

const ProductSection = () => {
  return (
    <section id="ourproducts" className={style.contentsection}>
      <h2 className={style.title}>منتجاتنا</h2>
      <div className={style.cards}>
        {productData.map((product) => (
          <motion.div
            className={style.card}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeIn",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
            }}
          >
            <img
              src={product.image}
              alt="product"
              height="300px"
              width="300px"
              className={style.image}
            />
            <section className={style.lower}>
              <p className={style.description}>{product.description}</p>
              <p className={style.price}>{product.price}</p>
            </section>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
