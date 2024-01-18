import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import magnifier from "../../assets/icons/search.png";
import order from "../../assets/icons/order.svg";
import styles from "./NavBar.module.css";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 480);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search for:", searchInput);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
  useEffect(() => {
    // Check the window width and set the isResponsive state when the component mounts
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 850);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Navbar

  const bar1 = [styles.bar, menuOpen ? styles.lineone : ""].join(" ");
  const bar2 = [styles.bar, menuOpen ? styles.linetwo : ""].join(" ");
  const bar3 = [styles.bar, menuOpen ? styles.linethree : ""].join(" ");

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.hamburger} onClick={handleMenuClick}>
          <span className={bar1}></span>
          <span className={bar2}></span>
          <span className={bar3}></span>
        </div>

        <div className={styles.divdrop}>
          <img className={styles.logo} src={logo} alt="citra's logo" />
        </div>
        <div>
          <ul className={` ${menuOpen ? styles.dropdown : styles.navUl}`}>
            <li>
              <NavLink
                className={styles.link}
                to="./"
                onClick={() => setMenuOpen(false)}
              >
                الصفحة الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.link}
                to="./shop"
                onClick={() => setMenuOpen(false)}
              >
                منتجاتنا
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.link}
                to="./"
                onClick={() => setMenuOpen(false)}
              >
                إطلب الآن
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.link}
                to="./aboutus"
                onClick={() => setMenuOpen(false)}
              >
                حولنا
              </NavLink>
            </li>

            <NavLink className={` ${styles.btn}`} to="./signin">
              تسجيل دخول
            </NavLink>
          </ul>
        </div>
        {/* <form className={`${styles.form} ${menuOpen ? styles.open : ""}`}>
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
        </form> */}

        <img
          className={`${styles.order} ${menuOpen ? styles.open : ""}`}
          src={order}
          alt="bag"
        />
      </nav>
    </header>
  );
}

export default NavBar;
