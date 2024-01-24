import React, { useState } from "react";
import style from "./ForgetPassword.module.css";

import logo from "../../assets/icons/logo.svg";

function ForgetPassword() {
  const [phone, setPhone] = useState(null);
  function phoneHandler(e) {
    setPhone(e.target.value);
  }
  function sendWhatsapp() {
    const phoneNumber = 961 + phone;
    const message = `use this link to change your password ${REACT_APP_BACKEND}`; //add id/slug here to user
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  }

  return (
    <section className={style.wrapper}>
      <form className={style.inputs}>
        <img src={logo} alt="Ctra" height="100px" width="100px" />
        <p className={style.forgotPass}>
          نسيت كلمة السر ؟<br /> أدخل رقم الهاتف كي نرسل لك رابط لاستعادة حسابك
        </p>
        <input
          type="number"
          name="number"
          value={phone}
          onChange={phoneHandler}
          placeholder="أدخل رقم الهاتف"
          className={style.inputField}
        />
        <button
          type="submit"
          className={style.submitBtn}
          onClick={sendWhatsapp}
        >
          أرسل الرابط
        </button>
      </form>
    </section>
  );
}

export default ForgetPassword;
