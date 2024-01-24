import React from "react";
import style from "../categorySection/categoryComponent.module.css";
import { motion } from "framer-motion";

const CategoryComponent = ({ data }) => {
  return (
    <motion.section
      className={style.container}
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeIn",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
    >
      <img className={style.image} src={data.image} alt="Background" />

      <h3 className={style.h3}>{data.name}</h3>
    </motion.section>
  );
};

export default CategoryComponent;
