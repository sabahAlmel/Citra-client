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
    autoplaySpeed: 3000,
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
          {productData?.products.map((element) => (
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
              key={element._id}
            >
              <NavLink
                to={`/singleProduct/${element.slug}`}
                className={style.productHolder}
                key={element._id}
              >
                <img
                  src={
                    element.images.length != 0
                      ? `${process.env.REACT_APP_BACKEND}${element.images[0]}`
                      : placeholder
                  }
                  alt="product"
                />
                <div className={style.details}>
                  <div>
                    <h4>{element.arabicName}</h4>
                    <p>${element.price}</p>
                  </div>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProductSection;
