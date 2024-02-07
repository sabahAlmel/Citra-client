import React, { useState, useEffect } from "react";
import styles from "./CategoryForm.module.css";
import axios from "axios";

function CategoryForm({ formData, onInputChange, onSubmit }) {
  console.log("Rendering ProductForm with formData:", formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("submitted form as ", formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}> تعديل الفئة</h1>
      <form action="#" onSubmit={handleSubmit}>
        <div className={styles.mainUserInfo}>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="arabicName">
              الاسم
            </label>
            <input
              className={styles.input}
              type="text"
              id="arabicName"
              name="arabicName"
              placeholder=" الاسم "
              value={formData.arabicName && formData.arabicName}
              // Add an onChange handler to update the state when the input changes
              onChange={onInputChange}
            />
          </div>
          <div>
            {" "}
            <p>اختاري الصور</p>
            <input
              type="file"
              id="files"
              onChange={onInputChange}
              name="image"
            />
          </div>
        </div>

        <div className={styles.formSubmitBtn}>
          <button type="submit"> تحديث</button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
