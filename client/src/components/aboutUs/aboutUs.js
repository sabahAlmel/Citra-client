import React, { useRef } from "react";
import image from "../../assets/images/image.jpeg";
import style from "../aboutUs/aboutUs.module.css";

const AboutUs = () => {
  return (
    <section id="aboutus" className={style.contentsection}>
      <div className={style.textcontainer}>
        <h2 className={style.title}>حولنا</h2>
        <p className={style.description}>
          Your description goes here.Your description goes here. Your
          description goes here. goes here.Your description goes here. Your
          description goes here. goes here.Your description goes here. Your
          description goes here. goes here.Your description goes here. Your
          description goes here. Your description goes here. Your description
          goes here. Your description goes here. Your description goes here.Your
          description goes here.Your description goes here. Your description
          goes here. Your width: 429px; goes here. Your description goes here.
        </p>
      </div>
      <img src={image} alt="صورة المنتج"></img>
    </section>
  );
};

export default AboutUs;
