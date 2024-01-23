import React from "react";
import style from "./ForgetPassword.module.css";

import logo from "../../assets/icons/logo.svg";

function ForgetPassword() {
  return (
    <section className={style.wrapper}>
      <form className={style.inputs}>
        <img src={logo} alt="Ctra" height="100px" width="100px" />
        <p className={style.forgotPass}>
          نسيت كلمة السر ؟ أدخل عنوان بريدك كي نرسل لك رابط لاستعادة حسابك
        </p>
        <input
          type="email"
          placeholder="أدخل بريدك الالكتروني"
          className={style.inputField}
        />
        <button type="submit" className={style.submitBtn}>
          أرسل الرابط
        </button>
      </form>
    </section>
  );
}

export default ForgetPassword;
