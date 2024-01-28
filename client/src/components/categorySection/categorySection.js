import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CategoryComponent from "../categorySection/categoryComponent.js";
import style from "../categorySection/categorySection.module.css";
import { ShopContext } from "../../ShopContext/ShopContext.js";
import { fetchAllCategories } from "../../db/fetchCategory.js";
import { useQuery } from "react-query";

const CategorySection = () => {
  const { selectedCategory, setSelectedCategory } = useContext(ShopContext);
  function handleCategory(id) {
    setSelectedCategory(id);
    console.log(selectedCategory);
  }

  const { isLoading: isLoadingCategory, data: allCategories } = useQuery(
    "shop-categ",
    fetchAllCategories,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  return (
    <section className={style.CategorySection}>
      <h2 className={style.title}>الفئات</h2>
      <div className={style.categoryContainer}>
        {allCategories?.categories.map((data, index) => (
          <NavLink to="/shop" onClick={() => handleCategory(data._id)}>
            <CategoryComponent
              key={index}
              data={data}
              onClick={() => handleCategory(data._id)}
            />
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
