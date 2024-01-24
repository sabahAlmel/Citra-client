import React from 'react';
import style from '../categorySection/categoryComponent.module.css'

const CategoryComponent = ({data}) => {

  return (

    <section className={style.container}>
     
      <img className={style.image} src={data.image} alt='Background'/>
     
      <h3 className={style.h3}>{data.name}</h3>
      </section>
  )
  }


  export default CategoryComponent
