import React from "react";
import CategoryComponent from "../categorySection/categoryComponent.js";
import style from "../categorySection/categorySection.module.css";
import image1 from "../../assets/images/hijab.jpg";
import image2 from "../../assets/images/hijabi2.jpg";
import image3 from "../../assets/images/hijabi3.jpg";
import image4 from "../../assets/images/hijabiCard.jpg";

const CategorySection = () => {
  const fakeCategory = [
    {
      id: 1,
      image: image4,
      name: "حجابات",
    },
    {
      id: 2,
      image: image1,
      name: "بيت قرآن",
    },
    {
      id: 3,
      image: image2,
      name: "مسبحة",
    },
    {
      id: 4,
      image: image3,
      name: "مرطبات",
    },
    {
      id: 5,
      image: image4,
      name: "صابون",
    },
    {
      id: 6,
      image: image2,
      name: "مناشف",
    },
    {
      id: 7,
      image: image4,
      name: "إكسسوارات",
    },
    {
      id: 8,
      image: image1,
      name: "أطقم صلاة",
    },
  ];

  return (
    <section className={style.CategorySection}>
      <h2 className={style.title}>الفئات</h2>
      <div className={style.categoryContainer}>
        {fakeCategory.map((data, index) => (
          <CategoryComponent key={index} data={data} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
