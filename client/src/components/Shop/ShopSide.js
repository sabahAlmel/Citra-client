import React, { useContext, useEffect, useState } from "react";
import style from "./ShopSide.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchAllCategories } from "../../db/fetchCategory";
import { fetchAllSubCategories } from "../../db/fetchSubCategory";
import { ShopContext } from "../../ShopContext/ShopContext";

const ShopSide = () => {
  const { selectedCategory, setSelectedCategory, setSelectedSubCategory } =
    useContext(ShopContext);
  const [sidePanelWidth, setSidePanelWidth] = useState(0);
  const [checkboxFilters, setCheckboxFilters] = useState([]);
  const [selectedSubcategoriesArray, setSelectedSubcategoriesArray] = useState(
    []
  );

  const openNav = () => {
    setSidePanelWidth(280);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  const { isLoading: isLoadingCategory, data: allCategories } = useQuery(
    "shop-categ",
    fetchAllCategories,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  const { isLoading: isLoadingSub, data: subCateg } = useQuery(
    "shop-sub",
    fetchAllSubCategories,
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  const handleRadioChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    setSelectedSubcategoriesArray([]);
  };

  useEffect(() => {
    if (subCateg && subCateg.subCateg) {
      setCheckboxFilters(subCateg.subCateg);
    }
  }, [subCateg]);

  const handleCheckboxChange = (filterId) => {
    const updatedFilters = checkboxFilters.map((filter) =>
      filter._id === filterId ? { ...filter, checked: !filter.checked } : filter
    );
    setCheckboxFilters(updatedFilters);

    const selectedSubcategories = updatedFilters
      .filter((filter) => filter.checked)
      .map((filter) => filter._id);

    setSelectedSubCategory(selectedSubcategories);
    setSelectedSubcategoriesArray(selectedSubcategories);
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

export default ShopSide;
