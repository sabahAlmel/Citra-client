import React from "react";
import { Link } from "react-router-dom";
import style from "./HeroSection.module.css";
import overview from "../../assets/images/hijab.jpg";
import { AuthContext } from "../../context/AuthContext";

function HeroSection() {
  return (
    <>
      <hero className={style.wrapper}>
        <section className={style.upper}>
          <p className={style.basmala}>
            {" "}
            بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ{" "}
          </p>
          <p className={style.upperTxt}>
            " إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ ۚ وَمَا
            تَوْفِيقِي إِلَّا <span className={style.bigger}>بِاللَّهِ ۚ</span>{" "}
            عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ " ﴿۸۸﴾
          </p>
        </section>
        <section className={style.lower}>
          <aside className={style.right}>
            <p className={style.slogan}>
              <span className={style.who}>من نحن ؟</span>
              <br />
              صالة مبيع منتجات سترا يعمل هذا المتجر على توفير منتجات فنية تم
              صنعها بأيادي أناس لديهم حاجة ماسة للعمل. الهدف هو دعم هؤلاء
              العاملين وتوفير منتجات فريدة وجودة عالية للزبائن كما يعود ريع تلك
              المنتجات لأعمال الخير.
            </p>
            <Link to="/shop" className={style.gotoshop}>
              الذهاب الى المتجر
            </Link>
          </aside>
          <aside className={style.left}>
            <img
              src={overview}
              alt="hero"
              className={style.image}
              height="100%"
              width="100%"
            />
          </aside>
        </section>
      </hero>
    </>
  );
}

export default HeroSection;
