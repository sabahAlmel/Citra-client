import React from 'react';
import imag from '../../assets/images/image.jpeg'
import style from '../productSection/productCard.module.css'


const ProductCard = (data) => {
  return (
    <article className={style.article}>
      <figure className={style.figure}>
        <img src={data.image} alt='product'/>
      </figure>
      <section className={style.section}>
        <p className={style.p}>
          {data.description}
        </p>
     
        <h2 className={style.h2}>{data.price}<span>$</span></h2>
      </section>
    </article>
  )
};

export default ProductCard;
