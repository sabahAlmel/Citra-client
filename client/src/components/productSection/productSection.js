import React from "react";
import placeholder from "../../assets/images/test.jpg";
import imag from "../../assets/images/hijabi2.jpg";
import imag1 from "../../assets/images/hijabi3.jpg";
import imag2 from "../../assets/images/hijab.jpg";
import imag3 from "../../assets/images/hijabiCard.jpg";

import style from "../productSection/productSection.module.css";
import { motion } from "framer-motion";
import { fetchEight } from "../../db/fetchProduct";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";

const ProductSection = () => {
  const { isLoading: isLoadingProducts, data: productData } = useQuery(
    "Eight-products",
    fetchEight,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  return (
    <section id="ourproducts" className={style.contentsection}>
      <h2 className={style.title}>منتجاتنا</h2>
      <div className={style.cards}>
        {productData?.products.map((product) => (
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
            <NavLink to={`/singleProduct/${product.slug}`}>
              <img
                src={
                  product.images.length != 0
                    ? `${process.env.REACT_APP_BACKEND}${product.images[0]}`
                    : placeholder
                }
                alt="product"
                height="300px"
                width="300px"
                className={style.image}
              />
              <section className={style.lower}>
                <p className={style.description}>{product.arabicName}</p>
                <p className={style.price}>$ {product.price}</p>
              </section>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
