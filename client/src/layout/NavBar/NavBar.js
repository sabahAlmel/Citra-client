import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import magnifier from "../../assets/icons/search.png";
import order from "../../assets/icons/order.svg";
import styles from "./NavBar.module.css";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search for:", searchInput);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.hamburger} onClick={handleMenuClick}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <Link className={styles.link}>
          <img className={styles.logo} src={logo} alt="citra's logo" />
        </Link>
        <div className={styles.dropdown}>
          <ul>
            <li>
              <NavLink className={styles.link} to="./">
                الصفحة الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="./shop">
                منتجاتنا
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="./">
                إطلب الآن
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="./aboutus">
                حولنا
              </NavLink>
            </li>
          </ul>
        </div>
        <form className={`${styles.form} ${menuOpen ? styles.open : ""}`}>
          <input
            id="search"
            type="text"
            placeholder="إبحث عن إسم المنتج"
            value={searchInput}
            onChange={handleSearchInputChange}
          ></input>
          <img
            className={styles.magnifier}
            src={magnifier}
            alt="magnifier"
            onClick={handleSearch}
          />
        </form>
        <Link className={`${styles.link} ${menuOpen ? styles.open : ""}`} to="./signin">
          تسجيل دخول
        </Link>
        <Link className={`${styles.link} ${menuOpen ? styles.open : ""}`} to="./signup">
          اشتراك
        </Link>
        <img className={`${styles.order} ${menuOpen ? styles.open : ""}`} src={order} alt="bag" />
      </nav>
    </header>
  );
}

export default NavBar;
