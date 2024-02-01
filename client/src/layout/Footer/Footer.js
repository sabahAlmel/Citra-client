import React from "react";
import { Link } from "react-router-dom";
import style from "./footer.module.css";
import logo from "../../assets/icons/logo.svg";
import buraqLogo from "../../assets/icons/Buraq-logo.png";
import fb from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";

function Footer() {
  return (
    <div className={style.bigWrapper}>
      <footer className={style.wrapper}>
        <section className={style.right}>
          <p className={`${style.add}`}>العنوان</p>
          <p className={style.text}>
            متجر سترا - مركز البراق شارع المئتين <br /> مقابل مستشفى أورانج ناسو
            <br />
            الطابق الأول <br />
            149 545 81 961+
          </p>
        </section>
        <section className={style.middle}>
          <p className={style.company}>تواصلوا مع سترا</p>
          <div className={style.info}>
            <aside className={style.side}>
              <Link
                to="https://instagram.com/albouraq.lb?igshid=NTc4MTIwNjQ2YQ=="
                className={style.link}
              >
                <img
                  src={instagram}
                  alt="instagram"
                  className={style.logo}
                  height="30px"
                  width="40px"
                />
              </Link>
              <Link
                to="https://m.facebook.com/Albouraqorganization/"
                className={style.link}
              >
                <img
                  src={fb}
                  alt="fb"
                  className={style.logo}
                  height="28px"
                  width="42px"
                />
              </Link>
            </aside>
            <img
              src={logo}
              className={style.ctra}
              alt="ctra"
              height="70px"
              width="70px"
            />
          </div>
        </section>
        <section className={style.left}>
          <p className={style.company}>تواصلوا مع براق</p>
          <div className={style.info}>
            <aside className={style.side}>
              <Link
                to="https://instagram.com/ctra_gifts?igshid=NzZlODBkYWE4Ng=="
                className={style.link}
              >
                <img
                  src={instagram}
                  alt="instagram"
                  className={style.logo}
                  height="30px"
                  width="40px"
                />
              </Link>
              <Link
                to="https://www.facebook.com/CtraGifts?mibextid=ZbWKwL"
                className={style.link}
              >
                <img
                  src={fb}
                  alt="fb"
                  className={style.logo}
                  height="28px"
                  width="42px"
                />
              </Link>
            </aside>
            <img src={buraqLogo} alt="buraq" height="100px" width="100px" />
          </div>
        </section>
      </footer>
      <div>
        <p className={style.copyRight}>
          &#169; 2024 ctra. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
