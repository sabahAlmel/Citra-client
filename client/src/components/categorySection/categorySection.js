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
    id:1,
     image:image ,
      name:'بيت قرآن'
  },
  {
    id:1,
     image:image ,
      name:'مسبحة'
  },
  {
    id:1,
     image:image ,
      name:'مرطبات'
  },
  {
    id:1,
     image:image ,
      name:'صابون'
  },
  {
    id:1,
     image:image ,
      name:'مناشف'
  },
  {
    id:1,
     image:image ,
      name:'إكسسوارات'
  },{
    id:1,
     image:image ,
      name:'أطقم صلاة'
  }
  ];



  return(
    <section className={style.categorySection}>
      <h2 className={style.title}>الخانات</h2>
      <div className={style.categoryContainer}>
        <div className={style.row}>
          {fakeCategory.slice(0, 3).map((category) => (
            <CategoryComponent
              key={category.id}
              image={category.image}
              name={category.name}
            />
          ))}
        </div>
        <div className={style.row}>
          {fakeCategory.slice(3, 6).map((category) => (
            <CategoryComponent
              key={category.id}
              image={category.image}
              name={category.name}
            />
          ))}
        </div>
        <div className={style.row}>
          {fakeCategory.slice(6, 8).map((category) => (
            <CategoryComponent
              key={category.id}
              image={category.image}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </section>

  )
  
}

export default CategorySection;