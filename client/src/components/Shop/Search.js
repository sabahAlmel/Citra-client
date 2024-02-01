import React, { useContext, useState } from "react";
import magnifire from "../../assets/icons/magnifire.jpeg";
import styles from "./Search.module.css";
import { searchProduct } from "../../db/fetchProduct";

function Search({ currentPage, setSearch }) {
  const [searchInput, setSearchInput] = useState();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchProduct(currentPage, searchInput);
      setSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.bookSearch} onSubmit={handleSearch}>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="ابحث عن منتج"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSearch;
        }}
      >
        <img src={magnifire} alt="search img" width="25" height="20" />
      </button>
    </form>
  );
}

export default Search;
