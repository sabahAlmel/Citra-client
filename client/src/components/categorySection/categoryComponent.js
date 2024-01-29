import React from "react";
import style from "../categorySection/categoryComponent.module.css";
import { motion } from "framer-motion";
import asal from "../../assets/images/3asal.jpg";
import sabun from "../../assets/images/sabun.jpg";
import manshafe from "../../assets/images/manshafe.jpg";
import kroshe from "../../assets/images/kroshe.jpg";
import takem from "../../assets/images/test.jpg";

const CategoryComponent = ({ data }) => {
  let image;
  if (data.arabicName == "مونة") {
    image = asal;
  } else if (data.arabicName == "صابون") {
    image = sabun;
  } else if (data.arabicName == "مناشف") {
    image = manshafe;
  } else if (data.arabicName == "كروشيه") {
    image = kroshe;
  } else if (data.arabicName == "أطقم صلاة") {
    image = takem;
  }
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
        <img className={style.image} src={image} alt="category" />
      )}

      <h3 className={style.h3}>{data.arabicName}</h3>
    </motion.section>
  );
};

export default CategoryComponent;
