import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import order from "../../assets/icons/order.svg";
import styles from "./NavBar.module.css";
import DropDownCart from "../../components/dorpDownCart/DropDownCart";
import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopping, setShopping] = useState(false);
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 480);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 850);
    };

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      if (currentScrollPos > prevScrollPos && shopping) {
        setShopping(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, shopping]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = () => {
    setShopping(!shopping);
  };

  const navigate = useNavigate();
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
    <header className={`${styles.header} ${visible ? "" : styles.hidden}`}>
      <nav className={styles.nav}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.hamburger} onClick={handleMenuClick}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
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
            {user ? (
              <NavLink
                className={
                  location.pathname === "/shop"
                    ? styles.activeLink
                    : styles.link
                }
                to="/overview"
              >
                لوحة التحكم
              </NavLink>
            ) : (
              ""
            )}
          </li>
          <li>
            {!user ? (
              <NavLink className={` ${styles.btn}`} to="./signin">
                تسجيل دخول
              </NavLink>
            ) : (
              <NavLink className={` ${styles.btn}`} to="./" onClick={logout}>
                logout
              </NavLink>
            )}
          </li>
        </ul>

        <img
          className={styles.logo}
          width={"70px"}
          height={"70px"}
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
