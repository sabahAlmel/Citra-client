import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import order from "../../assets/icons/order.svg";
import styles from "./NavBar.module.css";
import DropDownCart from "../../components/dorpDownCart/DropDownCart";

function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  ///shopping cart drop down menu
  const [shopping, setShopping] = useState(false);
  ////////
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 480);

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
  /////////////
  const navigate = useNavigate();
  const handleClick = () => {
    setShopping(!shopping);
  };
  //handle scroll
  const handleScrollToProduct = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document
        .getElementById("ourproducts")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("ourproducts")
          .scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  };

  const handleScrollToAbout = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById("aboutus").scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("aboutus")
          .scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  };
  const handlelogo = () => {
    navigate("./");
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.hamburger} onClick={handleMenuClick}>
            <span className={bar1}></span>
            <span className={bar2}></span>
            <span className={bar3}></span>
          </div>

          <button className={styles.cart}>
            <img
              className={`${styles.order} ${menuOpen ? styles.open : ""}`}
              src={order}
              width={"30px"}
              height={"30px"}
              alt="bag"
              onClick={handleClick}
            />
          </button>
          {shopping ? <DropDownCart setShopping={setShopping} /> : ""}
        </div>

        <ul className={` ${menuOpen ? styles.dropdown : styles.navUl}`}>
          <li>
            <NavLink
              className={
                location.pathname === "/" ? styles.activeLink : styles.link
              }
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              الصفحة الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.link}
              to={location.pathname === "/" ? "#" : "/"}
              onClick={() => handleScrollToProduct()}
            >
              منتجاتنا
            </NavLink>
          </li>
          <li>
            <NavLink
              to={location.pathname === "/" ? "#" : "/"}
              className={styles.link}
              onClick={() => handleScrollToAbout()}
            >
              حولنا
            </NavLink>
          </li>
          <li>
            <NavLink
              className={
                location.pathname === "/shop" ? styles.activeLink : styles.link
              }
              to="/shop"
              onClick={() => setMenuOpen(false)}
            >
              إطلب الآن
            </NavLink>
          </li>
          <li>
            <NavLink className={` ${styles.btn}`} to="./signin">
              تسجيل دخول
            </NavLink>
          </li>
        </ul>

        <img
          className={styles.logo}
          width={"100px"}
          height={"100px"}
          src={logo}
          alt="citra's logo"
          onClick={handlelogo}
          style={{ cursor: "pointer" }}
        />
      </nav>
    </header>
  );
}

export default NavBar;
