import React, { useRef } from "react";
import image from "../../assets/icons/logo.svg";
import style from "../aboutUs/aboutUs.module.css";
import { motion } from "framer-motion";
const AboutUs = () => {
  return (
    <motion.section
      id="aboutus"
      className={style.contentsection}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeIn",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      }}
    >
      <div className={style.textcontainer}>
        <h2 className={style.title}> فريق سترا</h2>
        <p className={style.description}>
          سيدات اجتمعنا على حب الدين والتزمنا بالعطاء رفعنا شعار "بصمة خير" عبر
          القيام بمشاريع توعوية ،علمية وانتاجية، لدعم المحتاجين من أبناء أمتنا
          نأمل بانضمامكن الينا لنحدث معا فرقا إيجابيا ونمضي نحو مجتمع مسلم هادف،
          ونموذجي .
        </p>
      </div>
      <img className={style.image} src={image} alt="صورة المنتج"></img>
    </motion.section>
  );
};

export default AboutUs;
