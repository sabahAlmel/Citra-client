import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import order from "../../assets/icons/order.svg";
import styles from "./NavBar.module.css";
import DropDownCart from "../../components/dorpDownCart/DropDownCart";

function NavBar() {
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
const navigate = useNavigate()
  const handleClick = () => {
    setShopping(!shopping);
  };
const handlelogo=()=>{
  navigate("./")
}
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
          {shopping ? <DropDownCart /> : ""}
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

        <img
          className={styles.logo}
          width={"60px"}
          height={"60px"}
          src={logo}
          alt="citra's logo"
          onClick={handlelogo}
          style={{cursor:"pointer"}}
        />
      </nav>
    </header>
  );
}

export default NavBar;
