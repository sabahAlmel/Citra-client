import React from "react";
import styles from "./AddressForm.module.css";

function AddressForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}>استمارة طلبية</h1>
      <form action="#">
        <div className={styles.mainUserInfo}>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="fullName">
              الاسم الكامل
            </label>
            <input
              className={styles.input}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="ادخل الاسم الكامل"
            />
          </div>
          {/* ... Other user input boxes */}
          <div className={styles.userInputBox}>
            <label for="area">المنطقة</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ادخل المنطقة"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="phoneNumber">رقم الهاتف</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="ادخل رقم الهاتف"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="building">البناية و الطابق</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="ادخل اسم البناية و الطابق"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="ownername">اسم صاحب المنزل</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="ادخل الاسم هنا"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="shopesname">اسم محلين جانب مدخل البناية</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="ادخل اسماء المحلات"
            />
          </div>
        </div>

        <div className={styles.formSubmitBtn}>
          <button type="submit"> طلب</button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
