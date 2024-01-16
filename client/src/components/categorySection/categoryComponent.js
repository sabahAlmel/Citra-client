import React from 'react';
import style from '../categorySection/categoryComponent.module.css'

const CategoryComponent = (data) => {

  return (

    <section className={style.container}>
      <img className={style.image} src={data.image} alt='Background'/>
      <button className={style.buttom}>{data.name}</button>
    </section>
  )
  }


  export default CategoryComponent
