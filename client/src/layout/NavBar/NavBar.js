import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import magnifire from "../../assets/icons/search.png";
import order from "../../assets/icons/order.svg";
import styles from "./NavBar.module.css";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const [activeLink, setActiveLink] = useState(null);
  const [menuOpenn, setMenuOpenn] = useState(false);

  // Handles changes in the search input.
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    // Add your search functionality here
    console.log("Search for:", searchInput);
    // You may want to perform the actual search logic here
  };

  // Function to handle link click
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const handlmenu = () => {
    setMenuOpenn(!menuOpenn);
    console.log("clicked"); // Toggle the menuOpen state
  };
  return (
    <header>
      <nav   className={`${styles.nav} ${
            menuOpenn ? styles.open : ""
          }`}>
      <div
          className={styles.navMenu}
          onClick={handlmenu} // Use handleClick function here
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link className={styles.link}>
          <img className={styles.logo} src={logo} alt="citra's logo " />
        </Link>
        <ul>
          <li>
            <NavLink className={styles.link} to="./">
              الصفحة الرئيسية
            </NavLink>{" "}
          </li>
          <li>
            <NavLink className={styles.link} to="./shop">
              {" "}
              منتجاتنا{" "}
            </NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink className={styles.link} to="./">
              إطلب الآن
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="./aboutus">
              حولنا
            </NavLink>{" "}
          </li>
        </ul>
        <form>
          <input
            id="search"
            type="text"
            placeholder="إبحث عن إسم المنتج"
            value={searchInput}
            onChange={handleSearchInputChange}
          ></input>
          <img
            className={styles.magnifire}
            src={magnifire}
            alt="magnifire"
            onClick={handleSearch}
          />
        </form>
        <Link className={styles.link} to="./signin">
          {" "}
          تسجيل دخول
        </Link>
        <Link className={styles.link} to="./signup">
          اشتراك
        </Link>
        <img src={order} alt="bag" />
      </nav>
    </header>
  );
}

export default NavBar;
