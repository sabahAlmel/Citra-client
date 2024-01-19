import React, { useState } from "react";
import style from "./ShopSide.module.css";
import { IoIosArrowBack } from "react-icons/io";

const ShopSide = () => {
  const [sidePanelWidth, setSidePanelWidth] = useState(0);

  const openNav = () => {
    setSidePanelWidth(280);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };
  let allCategories = {
    categories: [
      {
        _id: "65a17e21f2a3f8191855d4e6",
        name: "مجوهرات",
        __v: 0,
      },
      {
        _id: "65a1935e7be5c9797fe24c10",
        name: "أدوات مطبخ",
        createdAt: "2024-01-12T19:30:38.422Z",
        updatedAt: "2024-01-12T19:30:38.422Z",
        __v: 0,
      },
      {
        _id: "65a1936e2e6e56c21d1e3b0",
        name: "خانات التجرب",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a193656c21d1e3b0",
        name: " صباح",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65c21d1e3b0",
        name: " حسن",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a19361e2e6e56c21d1e3b0",
        name: "فؤاد ",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a193611d1e3b0",
        name: " غيسى",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
      {
        _id: "65a19361e21e3b0",
        name: " مصلايات",
        createdAt: "2024-01-12T19:30:41.969Z",
        updatedAt: "2024-01-12T19:30:41.969Z",
        __v: 0,
      },
    ],
  };
  let subCateg = {
    subCateg: [
      {
        _id: "65a1802af2a3f8191855d4eb",
        name: " اسم",
        categoryID: "65a19361e21e3b0",
        createdAt: "2024-01-12T18:08:42.135Z",
        updatedAt: "2024-01-12T19:59:33.786Z",
        __v: 0,
      },
      {
        _id: "65a197762e084d9b91920073",
        name: "  عيلة",
        categoryID: "65c21d1e3b0",
        createdAt: "2024-01-12T19:48:06.006Z",
        updatedAt: "2024-01-12T20:12:11.341Z",
        __v: 0,
      },
      {
        _id: "65a19777845e1181ca602b",
        name: "  منتوجات",
        categoryID: "65c21d1e3b0",
        createdAt: "2024-01-12T19:48:07.414Z",
        updatedAt: "2024-01-12T19:48:07.414Z",
        __v: 0,
      },
      {
        _id: "65a1977181ca602b",
        name: "   سيش منتوجات",
        categoryID: "65c21d1e3b0",
        createdAt: "2024-01-12T19:48:07.414Z",
        updatedAt: "2024-01-12T19:48:07.414Z",
        __v: 0,
      },
      {
        _id: "67845e1181ca602b",
        name: "   سشي منتوجات",
        categoryID: "65c21d1e3b0",
        createdAt: "2024-01-12T19:48:07.414Z",
        updatedAt: "2024-01-12T19:48:07.414Z",
        __v: 0,
      },
    ],
  };

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
            {allCategories.categories.map((filter) => (
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
