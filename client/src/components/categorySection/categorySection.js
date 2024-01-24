import React from 'react';
import CategoryComponent from '../categorySection/categoryComponent.js'
import style from '../categorySection/categorySection.module.css'
import image from '../../assets/images/hijab.webp'


const CategorySection = () => {
  const fakeCategory =[
    {
    id:1,
     image:image ,
      name:'حجابات'
  },
  {
    id:2,
     image:image ,
      name:'بيت قرآن'
  },
  {
    id:3,
     image:image ,
      name:'مسبحة'
  },
  {
    id:4,
     image:image ,
      name:'مرطبات'
  },
  {
    id:5,
     image:image ,
      name:'صابون'
  },
  {
    id:6,
     image:image ,
      name:'مناشف'
  },
  {
    id:7,
     image:image ,
      name:'إكسسوارات'
  },{
    id:8,
     image:image ,
      name:'أطقم صلاة'
  }
  ];



  return(
    <section className={style.CategorySection}>
      <h2 className={style.title}>الفئات</h2>
      <div className={style.categoryContainer}>
        {fakeCategory.map((data, index) => (
          <CategoryComponent key={index} data={data} />
        ))}
      </div>
    </section>
  

  )
  
}

export default CategorySection;