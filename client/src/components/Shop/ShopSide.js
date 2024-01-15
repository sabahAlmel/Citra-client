import React, { useState } from "react";
import style from "./ShopSide.module.css";
import { IoIosArrowForward } from "react-icons/io";

const ShopSide = () => {
  const [sidePanelWidth, setSidePanelWidth] = useState(0);

  const openNav = () => {
    setSidePanelWidth(280);
  };

  const closeNav = () => {
    setSidePanelWidth(0);
  };

  let subCateg = {
    subCateg: [
      {
        _id: "65a1802af2a3f8191855d4eb",
        name: "updated name",
        categoryID: "65a17e21f2a3f8191855d4e6",
        createdAt: "2024-01-12T18:08:42.135Z",
        updatedAt: "2024-01-12T19:59:33.786Z",
        __v: 0,
      },
      {
        _id: "65a197762e084d9b91920073",
        name: "New SubCategory Name",
        categoryID: "65a17e21f2a3f8191855d4e6",
        createdAt: "2024-01-12T19:48:06.006Z",
        updatedAt: "2024-01-12T20:12:11.341Z",
        __v: 0,
      },
      {
        _id: "65a19777845e118130ca602b",
        name: "testing sub category",
        categoryID: "65a17e21f2a3f8191855d4e6",
        createdAt: "2024-01-12T19:48:07.414Z",
        updatedAt: "2024-01-12T19:48:07.414Z",
        __v: 0,
      },
    ],
  };

  const [filters, setFilters] = useState(subCateg.subCateg);

  const handleCheckboxChange = (filterId) => {
    const updatedFilters = filters.map((filter) =>
      filter._id === filterId ? { ...filter, checked: !filter.checked } : filter
    );
    setFilters(updatedFilters);
  };

  return (
    <>
      <aside
        id="mySidepanel"
        className={style.sidepanel}
        style={{ width: sidePanelWidth + "px" }}
      >
        <section className={style.sideBarContainer}>
          <section className={style.closebtn} onClick={closeNav}>
            &times;
          </section>
          {subCateg.subCateg.map((filter) => (
            <section key={filter._id} className={style.filter}>
              <input
                type="checkbox"
                id={`filter_${filter._id}`}
                checked={filter.checked}
                className={style.inputFilter}
                onChange={() => handleCheckboxChange(filter._id)}
              />
              <label htmlFor={`filter_${filter.id}`}>{filter.name}</label>
            </section>
          ))}
        </section>
      </aside>

      <button className={style.openbtn} onClick={openNav}>
        <IoIosArrowForward />
      </button>
    </>
  );
};

export default ShopSide;
