import React from "react";
import style from "../categorySection/categoryComponent.module.css";
import { motion } from "framer-motion";
import image2 from "../../assets/images/hijabi2.jpg";

const CategoryComponent = ({ data }) => {
  return (
    <motion.section
      className={style.container}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeIn",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
    >
      {data.image ? (
        <img className={style.image} src={data.image} alt="Background" />
      ) : (
        <img className={style.image} src={image2} alt="category" />
      )}

      <h3 className={style.h3}>{data.arabicName}</h3>
    </motion.section>
  );
};

export default CategoryComponent;
