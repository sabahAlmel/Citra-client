import React from "react";
import { Link } from "react-router-dom";
import style from "./HeroSection.module.css";
import overview from "../../assets/images/overview.jpeg";

function HeroSection() {
  return (
    <>
      <hero className={style.wrapper}>
        <section className={style.upper}>
          <p>
            إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ ۚ وَمَا تَوْفِيقِي
            إِلَّا{" "}
            <span style={{ color: "var(--blue-color)", fontSize: "4rem" }}>
              بِاللَّهِ ۚ
            </span>{" "}
            عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ
          </p>
        </section>
        <section className={style.lower}>
          <aside className={style.right}>
            <p className={style.slogan}>
              صالة مبيع منتجات سترا يعمل هذا المتجر على توفير منتجات فنية تم
              صنعها بأيادي أناس لديهم حاجة ماسة للعمل. الهدف هو دعم هؤلاء
              العاملين وتوفير منتجات فريدة وجودة عالية للزبائن كما يعود ريع تلك
              المنتجات لأعمال الخير.
            </p>
            <Link to="/shop" className={style.gotoshop}>
              الذهاب الى المتجر
            </Link>
          </aside>
          <img
            src={overview}
            alt="hero"
            className={style.image}
            height="600px"
            width="600px"
          />
        </section>
      </hero>
    </>
  );
}

export default HeroSection;
