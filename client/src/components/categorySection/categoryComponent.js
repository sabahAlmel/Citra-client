import React from "react";
import style from "../categorySection/categoryComponent.module.css";
import { motion } from "framer-motion";
import asal from "../../assets/images/3asal.jpg";
import sabun from "../../assets/images/sabun.jpg";
import manshafe from "../../assets/images/manshafe.jpg";
import accessories from "../../assets/images/accessories.jpg";
import takem from "../../assets/images/test.jpg";
import crochet from "../../assets/images/crochet.jpg";
import mashlah from "../../assets/images/mashlah2.jpg";
import masbaha from "../../assets/images/masabeh.jpeg";

const CategoryComponent = ({ data }) => {
  let image;
  if (data.arabicName == "مونة") {
    image = asal;
  } else if (data.arabicName == "صابون") {
    image = sabun;
  } else if (data.arabicName == "مناشف") {
    image = manshafe;
  } else if (data.arabicName == "كروشيه") {
    image = crochet;
  } else if (data.arabicName == "أطقم صلاة") {
    image = takem;
  } else if (data.arabicName == "إكسسوارات") {
    image = accessories;
  } else if (data.arabicName == "مشالح و إسدالات") {
    image = mashlah;
  } else if (data.arabicName == "مسبحة") {
    image = masbaha;
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
