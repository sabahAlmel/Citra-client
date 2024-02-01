import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUsers,
  faChartBar,
  faShoppingBag,
  faClipboardList,
  faSignOutAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import Styles from "./Styles.module.css";

const menuItems = [
  { title: "نظرة عامة ", icon: faChartBar, path: "/overview" },
  { title: "المستخدمين", icon: faUsers, path: "/users" },
  { title: "منتجات", icon: faShoppingBag, path: "/products" },
  { title: "طلبات", icon: faClipboardList, path: "/orders" },
  { title: " الصفحة الرئيسية", icon: faHome, path: "/" },

  { title: "تسجيل خروج", icon: faSignOutAlt },
];
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const handleLinkClick = () => {
    //close side after navigate
    setIsOpen(false);
  };

  return (
    <div
      className={cx(Styles.sidebar, { [Styles["sidebar-closed"]]: !isOpen })}
    >
      <button
        className={Styles.sidebar__button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        {menuItems.map((item) => (
          <li className={Styles.li} key={item.title}>
            {item.title === "تسجيل خروج" ? (
              <NavLink
                className={cx(Styles.sidebar__listItem, {
                  [Styles.activelink]: location.pathname === item.path,
                })}
                to={item.path}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  className={Styles.sidebar__icon}
                  icon={item.icon}
                />
                <CSSTransition
                  in={isOpen}
                  timeout={200}
                  className={Styles.fade}
                  unmountOnExit
                >
                  <span>{item.title}</span>
                </CSSTransition>
              </NavLink>
            ) : (
              <Link
                className={cx(Styles.sidebar__listItem, {
                  [Styles.activelink]: location.pathname === item.path,
                })}
                to={item.path}
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  className={Styles.sidebar__icon}
                  icon={item.icon}
                />
                <CSSTransition
                  in={isOpen}
                  timeout={200}
                  className={Styles.fade}
                  unmountOnExit
                >
                  <span>{item.title}</span>
                </CSSTransition>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
