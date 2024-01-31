import React, { useEffect, useState } from "react";
import placeholder from "../../assets/images/test.jpg";
import Slider from "react-slick";
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
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="ourproducts" className={style.contentsection}>
      <h2 className={style.title}>أحدث منتجاتنا</h2>
      <div className={style.cards}>
        <Slider {...settings} style={{ width: "100%", height: "450px" }}>
          {productData?.products.map((product) => (
            <motion.div
              className={style.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeIn",
                stiffness: 130,
                damping: 10,
                duration: 0.3,
              }}
              style={{
                width: "120px",
                height: "450px",
              }}
              key={product._id}
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
        </Slider>
      </div>
    </section>
  );
};

export default ProductSection;
