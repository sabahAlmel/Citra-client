import React, { useRef } from "react";
import image from "../../assets/images/hijabi3.jpg";
import style from "../aboutUs/aboutUs.module.css";

const AboutUs = () => {
  return (
    <section id="aboutus" className={style.contentsection}>
      <div className={style.textcontainer}>
        <h2 className={style.title}>حولنا</h2>
        <p className={style.description}>
          صالة مبيع منتجات سترا يعمل هذا المتجر على توفير منتجات فنية تم صنعها
          بأيادي أناس لديهم حاجة ماسة للعمل. الهدف هو دعم هؤلاء العاملين وتوفير
          منتجات فريدة وجودة عالية للزبائن كما يعود ريع تلك المنتجات لأعمال
          الخير.
        </p>
      </div>
      <img src={image} alt="صورة المنتج"></img>
    </section>
  );
};

export default AboutUs;
