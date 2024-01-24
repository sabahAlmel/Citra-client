import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUsers,
  faChartBar,
  faShoppingBag,
  faClipboardList,
  faSignOutAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import Styles from "./Styles.module.css";

const menuItems = [
  { title: "نظرة عامة ", icon: faChartBar, path: "/overview"},
  { title: "المستخدمين", icon: faUsers, path:"/users" },
  { title: "منتجات", icon: faShoppingBag, path:"/products"  },
  { title: "طلبات", icon: faClipboardList ,path:"/orders" },
  { title: " الصفحة الرئيسية", icon: faHome ,path:"/" },

  // { title: "تسجيل خروج", icon: faSignOutAlt }
 

];
// const logout = async () => {
//   try{


//         await axios.get(`${process.env.REACT_APP_API}user/logout`);
//   setUser(null);
//     } catch (error) {
//     console.error("Error logging out:", error);
//   }
// };
// const navigate = useNavigate();
// const handleLogout = () => {
//   try {
//     // setUser(null);

//     logout(); // Call the logout function from AuthContext
//     navigate("/");
//   } catch (error) {
//     console.log("err from handle logout", error);
//   }
// };
const Sidebar = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    // Close side after navigate
    setIsOpen(false);
  };

  const handleLogout = async () => {
    // Handle logout logic here
    try {
      await axios.get(`${process.env.REACT_APP_API}user/logout`);
      // setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={cx(Styles.sidebar, { [Styles["sidebar-closed"]]: !isOpen })}>
      <button
        className={Styles.sidebar__button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      
      <ul className={Styles.ul}>
        {menuItems.map(item => (
          <li className={Styles.li} key={item.title}>
            <NavLink  className={cx(Styles.sidebar__listItem, {
                [Styles.activelink]: location.pathname === item.path,
              })}
              to={item.path}
              onClick={handleLinkClick}>
              <FontAwesomeIcon className={Styles.sidebar__icon} icon={item.icon} />
              <CSSTransition
                in={isOpen}
                timeout={200}
                className={Styles.fade}
                unmountOnExit
              >
                <span>{item.title}</span>
              </CSSTransition>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout Link outside the ul */}
      <div
        className={cx(
          Styles.sidebar__listItem,
          Styles.li,
          Styles.logout,
          { [Styles.activelink]: location.pathname === "/logout" }
        )}
        onClick={handleLogout}
      >
        <FontAwesomeIcon className={Styles.sidebar__icon} icon={faSignOutAlt} />
        <CSSTransition
          in={isOpen}
          timeout={200}
          className={Styles.fade}
          unmountOnExit
        >
          <span>تسجيل خروج</span>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Sidebar;