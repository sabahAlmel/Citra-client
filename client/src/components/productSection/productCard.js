import React from "react";
import style from "../productSection/productCard.module.css";

const ProductCard = (data) => {
  return (
    <section className={style.productSection}>
      <img src={data.image} alt="product" />
      <div className={style.section}>
        <div>
          <h4>{data.name}</h4>
          <p>{data.price}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
