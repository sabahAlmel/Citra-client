import React from "react";
import CategorySection from "../../components/categorySection/categorySection";
import AboutUs from "../../components/aboutUs/aboutUs";
import ProductSection from "../../components/productSection/productSection";
import style from "../../pages/Home/Home.module.css";
import HeroSection from "../../components/heroSection/HeroSection";
function Home() {
  return (
    <div className={style.wrapper}>
      <HeroSection />
      <CategorySection />
      <AboutUs />
      <ProductSection />
    </div>
  );
}

export default Home;
