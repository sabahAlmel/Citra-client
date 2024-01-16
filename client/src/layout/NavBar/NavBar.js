import React from "react";
import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import Styles from "./NavBar.module.css";
import logo from "../../assets/icons/logo.svg";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { withStyles } from "@mui/material/styles";

function Navbar() {
  const [collapesed, setCollapsed] = useState(false);

  // nav with active
  const [isActive, setActive] = useState([false, false, false]);
  const navigate = useNavigate();
  const handleLinkClick = (index, path) => {
    setActive([false, false, false, false, false]);
    setActive((prev) => {
      const newActive = [...prev];
      newActive[index] = true;
      return newActive;
    });
    localStorage.setItem("activeLink", path);
    navigate(path);

    setCollapsed(false);
  };

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    const activeIndex = [
      "/",
      // "/signup",
      // "/signin",
      "/shop",
      "/aboutus",
    ].indexOf(storedActiveLink);
    setActive([false, false, false, false, false]);
    if (activeIndex !== -1) {
      setActive((prev) => {
        const newActive = [...prev];
        newActive[activeIndex] = true;
        return newActive;
      });
    }
  }, [navigate]);

  // MUI
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl1(null);
  };

  const handleClickMobile = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseMobile = () => {
    setAnchorEl2(null);
  };

  // Navbar
  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 600) {
        setCollapsed(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const toggleClasses = [
    Styles.linksWrapperMobile,
    collapesed ? Styles.activeNav : "",
  ].join(" ");
  const bar1 = [Styles.line1, collapesed ? Styles.a : ""].join(" ");
  const bar2 = [Styles.line2, collapesed ? Styles.a : ""].join(" ");
  const bar3 = [Styles.line3, collapesed ? Styles.a : ""].join(" ");

  // Go to Login Page
  const goToLoginPage = () => {
    navigate("/signin");
  };

  // Go to Sign Up Page
  const goToSignUpPage = () => {
    navigate("/signup");
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: ` 2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <section className={Styles.heroSection}>
      <header className={Styles.header}>
        <nav className={Styles.navBar}>
          <NavLink
            to="/"
            onClick={() => handleLinkClick(0, "/")}
            className={Styles.logoContainer}
            aria-label="Go to homepage"
          >
            <img src={logo} height={60} alt="Lalezar Logo" />
          </NavLink>

          <ul className={Styles.linksWrapperContainer}>
            {/* Categoriy Drop Down beginning */}

            {/* Navbar beginning */}
            <ul className={Styles.linksWrapper}>
              <div className={Styles.linksWrapper}>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => handleLinkClick(0, "/")}
                    className={isActive[0] ? Styles.activeLink : ""}
                  >
                    الصفحة الرئيسية
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop"
                    onClick={() => handleLinkClick(1, "/shop")}
                    className={isActive[1] ? Styles.activeLink : ""}
                  >
                    تسوق الآن
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/aboutus"
                    onClick={() => handleLinkClick(2, "/aboutus")}
                    className={isActive[2] ? Styles.activeLink : ""}
                  >
                    حولنا
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => handleLinkClick(3, "/")}
                    className={isActive[3] ? Styles.activeLink : ""}
                  >
                    تسجيل دخول
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => handleLinkClick(4, "/")}
                    className={isActive[4] ? Styles.activeLink : ""}
                  >
                    ابحث
                  </NavLink>
                </li>
                <li>
                  <form className={Styles.search}>
                    <div>
                      <input
                        id="search"
                        className={Styles.inputSearch}
                        type="text"
                        placeholder="إبحث عن إسم المنتج"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                      />
                      <button
                        type="button"
                        className={Styles.searchButton}
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
              </div>
            </ul>
            {/* Navbar Ending */}

            {/* Badge beginning */}

            <IconButton
              aria-label="cart"
              sx={{
                "&:hover": {
                  background: "transparent",
                },
              }}
            >
              <Badge
                badgeContent={4}
                color="secondary"
                sx={{
                  color: "black",
                  "& .MuiBadge-badge": { bgcolor: "#C86823" },
                  "& .MuiBadge-badge:hover": {
                    bgcolor: "#A0471D",
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Badge ending */}

            {/* SignUp LogIn beginning */}
            <ul className={Styles.signinup}>
              <li>
                <Stack spacing={2} direction="row">
                  <div className={Styles.loulou}>
                    <Button
                      onClick={goToLoginPage}
                      variant="outlined"
                      sx={{
                        color: "#C86823",
                        borderColor: "#C86823",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#C86823",
                          backgroundColor: "#C86823",
                          color: "white",
                        },
                      }}
                    >
                      سجل دخول
                    </Button>
                  </div>

                  <div>
                    {" "}
                    <Button
                      onClick={goToSignUpPage}
                      variant="contained"
                      sx={{
                        bgcolor: "#C86823",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#A0471D",
                          color: "white",
                        },
                      }}
                    >
                      اشتراك
                    </Button>
                  </div>
                </Stack>
              </li>
            </ul>
            {/* SignUp LogIn ending */}
          </ul>

          {/* ///////////////
          /////////////////
          /////////////////
          /////////////////
          ////////////////

          this for burger 
          
          /////////////////
          ////////////////
          ////////////////
          ////////////////
          ////////////*/}

          <ul className={toggleClasses}>
            <li>
              <NavLink
                to="/home"
                onClick={() => handleLinkClick(0, "/home")}
                className={isActive[0] ? Styles.activeLink : ""}
              >
                الصفحة الرئيسية
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={() => handleLinkClick(1, "/shop")}
                className={isActive[1] ? Styles.activeLink : ""}
              >
                تسوق الآن
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutus"
                onClick={() => handleLinkClick(2, "/aboutus")}
                className={isActive[2] ? Styles.activeLink : ""}
              >
                حولنا
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/signin"
                onClick={() => handleLinkClick(3, "/signin")}
                className={isActive[3] ? Styles.activeLink : ""}
              >
                تسجيل دخول
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                onClick={() => handleLinkClick(4, "/")}
                className={isActive[4] ? Styles.activeLink : ""}
              >
                ابحث
              </NavLink>
            </li>

            {/* <li>
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open2 ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? "true" : undefined}
                  endIcon={<ExpandMoreIcon />}
                  onClick={handleClickMobile}
                  sx={{
                    color: "white",
                    fontSize: "16px",
                    textTransform: "none",
                    "&:hover": {
                      opacity: "1",
                      transition: "0.5s ease",
                      color: "#C86823",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Categories
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleCloseMobile}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    style: {
                      color: "white",
                      backgroundColor: "black",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    Eastern & Western
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    Artal Al Ajdad
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    AL Baset
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={Styles.menuItem}>
                    Local Products
                  </MenuItem>
                </Menu>
              </div>
            </li> */}

            <li>
              <Stack
                direction="row"
                sx={{
                  flexDirection: "column",
                  rowGap: "30px",
                  margin: "0 20px",
                }}
              >
                <Button
                  onClick={goToLoginPage}
                  variant="outlined"
                  sx={{
                    color: "#C86823",
                    borderColor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    // width:"100px",
                    "&:hover": {
                      borderColor: "#C86823",
                      backgroundColor: "#C86823",
                      color: "white",
                    },
                  }}
                >
                  LogIn
                </Button>

                <Button
                  onClick={goToSignUpPage}
                  variant="contained"
                  sx={{
                    bgcolor: "#C86823",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    // width:"100px",
                    "&:hover": {
                      bgcolor: "#A0471D",
                      color: "white",
                    },
                  }}
                >
                  SignUp
                </Button>
              </Stack>
            </li>
          </ul>

          <div
            className={Styles.burgerButton}
            onClick={() => setCollapsed(!collapesed)}
          >
            <div className={bar1}></div>
            <div className={bar2}></div>
            <div className={bar3}></div>
          </div>
        </nav>
      </header>
    </section>
  );
}

export default Navbar;
