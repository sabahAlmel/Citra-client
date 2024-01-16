import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import navBarStyle from "./NavBar.module.css";
import magnifire from "../../assets/icons/search.png";
import order from "../../assets/icons/order.svg";
const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const [menuOpenn, setMenuOpenn] = useState(false);
  const [isActive, setActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 480);

  const handlemenue = () => {
    setMenuOpenn(!menuOpenn);
    console.log("clicked"); // Toggle the menuOpen state
  };

  useEffect(() => {
    // Check the window width and set the isResponsive state when the component mounts
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Handles changes in the search input.
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    // Add your search functionality here
    console.log("Search for:", searchInput);
    // You may want to perform the actual search logic here
  };

  return (
    <div className={navBarStyle.navContainer}>
      <nav className={navBarStyle.navBar}>
        <div
          className={navBarStyle.navMenu}
          onClick={handlemenue} // Use handleClick function here
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul
          className={`${navBarStyle.navUl} ${
            menuOpenn ? navBarStyle.open : ""
          }`}
        >
          <di className={navBarStyle.container}>
            <div className={navBarStyle.right}>
              <li>
                <NavLink
                  onClick={() => {
                    setActive([false, false, true, false, false, false]);
                  }}
                  className={`${navBarStyle.navLi} ${
                    isActive[2] ? navBarStyle.active : ""
                  }`}
                  to={"./aboutus"}
                >
                  حولنا
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    setActive([false, false, false, false, false, true]);
                  }}
                  className={`${navBarStyle.navLi} ${
                    isActive[6] ? navBarStyle.active : ""
                  }`}
                  to={"./"}
                >
                  إكتشف المزيد
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    setActive([true, false, false, false, false, false]);
                  }}
                  className={`${navBarStyle.navLi} ${
                    isActive[0] ? navBarStyle.active : ""
                  }`}
                  to={"./"}
                >
                  الصفحة الرئيسية
                </NavLink>
              </li>
            </div>

            <div className={navBarStyle.logoContainer}>
              <NavLink
                onClick={() => {
                  setActive([true, false, false, false, false, false]);
                }}
                to={"./"}
              >
                <img
                  className={navBarStyle.navImg}
                  src={isResponsive ? logo : logo}
                  alt="logo"
                />
              </NavLink>
            </div>

            <div className={navBarStyle.left}>
              <li className={navBarStyle.signin}>
                <NavLink
                  onClick={() => {
                    setActive([false, false, false, true, false, false]);
                  }}
                  className={`${navBarStyle.navLi} ${
                    isActive[4] ? navBarStyle.active : ""
                  }`}
                  to={"./signin"}
                >
                  تسجيل دخول
                </NavLink>
              </li>

              <li>
                <form className={navBarStyle.search}>
                  <div>
                    <input
                      id="search"
                      className={navBarStyle.inputSearch}
                      type="text"
                      placeholder="إبحث عن إسم المنتج"
                      value={searchInput}
                      onChange={handleSearchInputChange}
                    />
                    <button
                      type="button"
                      className={navBarStyle.searchButton}
                      onClick={handleSearch}
                    >
                      <img
                        src={magnifire}
                        alt="search img"
                        width="25"
                        height="20"
                      />
                    </button>
                  </div>
                </form>
              </li>

              <li>
                <div className={navBarStyle.order}>
                  <NavLink
                    onClick={() => {
                      setActive([false, false, false, false, false, false]);
                    }}
                    className={`${navBarStyle.navLi} ${
                      isActive[1] ? navBarStyle.active : ""
                    }`}
                    to={"./shop"}
                  >
                    إطلب الآن
                  </NavLink>
                  <img src={order} alt="orderNow" />
                </div>
              </li>
            </div>
          </di>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
