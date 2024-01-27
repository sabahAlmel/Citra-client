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
  const [isAbove769px, setIsAbove769px] = useState(window.innerWidth > 769);

  useEffect(() => {
    function handleResize() {
      setIsAbove769px(window.innerWidth > 769);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 769 && sidePanelWidth === 0) {
      openNav();
    } else if (window.innerWidth <= 769 && sidePanelWidth > 0) {
      closeNav();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidePanelWidth]);

  const openNav = () => {
    setSidePanelWidth(280);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };
  useEffect(() => {
    if (isAbove769px) {
      openNav();
    } else {
      closeNav();
    }
  }, []);
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

  return (
    <>
      <aside
        id="mySidepanel"
        className={style.sidepanel}
        style={{ width: sidePanelWidth + "px" }}
      >
        <section className={style.sideBarContainer}>
          <section className={style.head}>
            {!isAbove769px && (
              <div className={style.closebtn} onClick={closeNav}>
                &times;
              </div>
            )}
            <h2>الخانات الاساسية</h2>
          </section>
          <form>
            {allCategories?.categories.map((filter) => (
              <section key={filter._id} className={style.filter}>
                <input
                  type="radio"
                  name="category"
                  value={filter.arabicName}
                  id={`filter_${filter._id}`}
                  checked={filter._id === selectedCategory}
                  className={style.inputFilter}
                  onChange={() => handleRadioChange(filter._id)}
                />
                <label htmlFor={`filter_${filter._id}`}>
                  {filter.arabicName}
                </label>
              </section>
            ))}
            <div className={style.line}></div>
            <div className={style.subHead}>
              {selectedCategory &&
                (checkboxFilters.some(
                  (filter) => filter.categoryID === selectedCategory
                ) ? (
                  <h2>الخانات الفرعية</h2>
                ) : null)}
            </div>
            {selectedCategory &&
              checkboxFilters.map((filter) => {
                if (filter.categoryID === selectedCategory) {
                  return (
                    <section key={filter._id} className={style.filter}>
                      <input
                        type="checkbox"
                        name={filter.arabicName}
                        value={filter.arabicName}
                        id={`filter_${filter._id}`}
                        checked={filter.checked}
                        className={style.inputFilter}
                        onChange={() => handleCheckboxChange(filter._id)}
                      />
                      <label htmlFor={`filter_${filter._id}`}>
                        {filter.arabicName}
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
