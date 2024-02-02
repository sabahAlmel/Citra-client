import React from "react";
import Product from "../../components/Shop/Product";
import style from "./Shop.module.css";

function Shop() {
  return (
    <section className={style.ShopCont}>
      <Product />
    </section>
  );
}

export default Shop;
