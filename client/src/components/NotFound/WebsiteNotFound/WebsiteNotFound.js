import React from "react";
import notfoundd from "../../../assets/images/notfoundd.jpeg";
import styles from "./WebsiteNotFound.module.css";
import { Link } from "react-router-dom";
function WebsiteNotFound() {
  return (
    <section className={styles.main}>
      <h1 className={styles.header1}>الصفحة غير متوفرة</h1>
      <img className={styles.image} src={notfoundd} alt="حصل خطأ" />
      <Link to="/" className={styles.gotohome}>
        الصفحة الرئيسية
      </Link>
    </section>
  );
}

export default WebsiteNotFound;
