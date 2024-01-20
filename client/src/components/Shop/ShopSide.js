import React, { useState } from "react";
import style from "./ShopSide.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchAllCategories } from "../../db/fetchCategory";
import { fetchAllSubCategories } from "../../db/fetchSubCategory";

const ShopSide = () => {
  const [sidePanelWidth, setSidePanelWidth] = useState(0);

  const openNav = () => {
    setSidePanelWidth(280);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  const { isLoadingCategory, data: allCategories } = useQuery(
    "shop-categ",
    fetchAllCategories,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  const { isLoadingSub, data: subCateg } = useQuery(
    "shop-sub",
    fetchAllSubCategories,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  console.log(allCategories);
  console.log(subCateg.subCateg);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checkboxFilters, setCheckboxFilters] = useState(subCateg.subCateg);
  const handleRadioChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCheckboxChange = (filterId) => {
    const updatedFilters = checkboxFilters.map((filter) =>
      filter._id === filterId ? { ...filter, checked: !filter.checked } : filter
    );
    setCheckboxFilters(updatedFilters);
  };
  if (isLoadingCategory && isLoadingSub) {
    return <h2>loading...</h2>;
  }
  return (
    <>
      <aside
        id="mySidepanel"
        className={style.sidepanel}
        style={{ width: sidePanelWidth + "px" }}
      >
        <section className={style.sideBarContainer}>
          <section className={style.head}>
            <div className={style.closebtn} onClick={closeNav}>
              &times;
            </div>
            <h3>الخانات الاساسية</h3>
          </section>
          <form>
            {allCategories?.categories.map((filter) => (
              <section key={filter._id} className={style.filter}>
                <input
                  type="radio"
                  name="category"
                  value={filter.name}
                  id={`filter_${filter._id}`}
                  checked={filter._id === selectedCategory}
                  className={style.inputFilter}
                  onChange={() => handleRadioChange(filter._id)}
                />
                <label htmlFor={`filter_${filter._id}`}>{filter.name}</label>
              </section>
            ))}
            <div className={style.line}></div>
            <div className={style.subHead}>
              {selectedCategory &&
                (checkboxFilters.some(
                  (filter) => filter.categoryID === selectedCategory
                ) ? (
                  <h3>الخانات الفرعية</h3>
                ) : null)}
            </div>
            {selectedCategory &&
              checkboxFilters.map((filter) => {
                if (filter.categoryID === selectedCategory) {
                  return (
                    <section key={filter._id} className={style.filter}>
                      <input
                        type="checkbox"
                        name={filter.name}
                        value={filter.name}
                        id={`filter_${filter._id}`}
                        checked={filter.checked}
                        className={style.inputFilter}
                        onChange={() => handleCheckboxChange(filter._id)}
                      />
                      <label htmlFor={`filter_${filter._id}`}>
                        {filter.name}
                      </label>
                    </section>
                  );
                } else {
                  return null;
                }
              })}
          </form>
        </section>
      </aside>

      <button className={style.openbtn} onClick={openNav}>
        <IoIosArrowBack />
      </button>
    </>
  );
};
