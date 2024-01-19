import React from "react";
import ProductImages from "../../components/SingleProduct/ProductImages";
import Content from "../../components/SingleProduct/Content";
import style from "./SingleProductLayout.module.css";
function SingleProductLayout() {
  return (
    <section className={style.handle}>
      <ProductImages />
      <Content />
    </section>
  );
}

export default SingleProductLayout;
