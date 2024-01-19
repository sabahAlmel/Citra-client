import React from "react";
import { Link } from "react-router-dom";
import style from "./footer.module.css";
import logo from "../../assets/icons/logo.svg";
import buraqLogo from "../../assets/icons/Buraq-logo.png";
import fb from "../../assets/icons/fb.png";
import instagram from "../../assets/icons/instagram.png";

function Footer() {
  return (

    <footer className={style.wrapper}>
      <section className={style.right}>
        <p className={style.text}>متجر سترا - مركز البراق</p>
        <p className={style.text}>شارع المئتين - مقابل مستشفى أورانج ناسو</p>
        <p className={style.text}>الطابق الأول</p>
        <p className={style.text}>149 545 81 961+</p>
      </section>
      <section className={style.middle}>
        <aside className={style.side}>
          <Link
            to="https://instagram.com/albouraq.lb?igshid=NTc4MTIwNjQ2YQ=="
            className={style.link}
          >
            Instagram
            <img src={instagram} alt="instagram" className={style.logo} />
          </Link>
          <Link
            to="https://m.facebook.com/Albouraqorganization/"
            className={style.link}
          >
            Facebook
            <img src={fb} alt="fb" className={style.logo} />
          </Link>
        </aside>
        <img src={logo} alt="ctra" height="70px" width="70px" />
      </section>
      <section className={style.left}>
        <aside className={style.side}>
          <Link
            to="https://instagram.com/ctra_gifts?igshid=NzZlODBkYWE4Ng=="
            className={style.link}
          >
            Instagram
            <img src={instagram} alt="instagram" className={style.logo} />
          </Link>
          <Link
            to="https://www.facebook.com/CtraGifts?mibextid=ZbWKwL"
            className={style.link}
          >
            Facebook
            <img src={fb} alt="fb" className={style.logo} />
          </Link>
        </aside>
        <img src={buraqLogo} alt="buraq" height="100px" width="100px" />
      </section>
    </footer>
  );
}

export default Footer;
