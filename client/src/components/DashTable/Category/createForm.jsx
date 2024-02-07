import React, { useEffect, useState } from "react";
import styles from "../../categoryForm/CategoryForm.module.css";
import axios from "axios";
import { toast } from "react-toastify";

function CreateCategoryForm({ id, onClose }) {
  const [formData, setFormData] = useState({
    arabicName: "",
    name: "",
    image: null,
  });
  const [initial, setInitial] = useState({});
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fd = new FormData();
      fd.append("arabicName", formData.arabicName);
      fd.append("name", formData.name);
      fd.append("image", formData.image);
      console.log("fd::::", fd);
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND}category/create`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        onClose();
        toast.success("تمت اضافة المعلومات بنجاح");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container} style={{ width: "50%" }}>
      <h1 className={styles.formTitle}> اضف فئة</h1>
      <form action="#" onSubmit={handleSubmit}>
        <div className={styles.mainUserInfo}>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="arabicName">
              الاسم العربي
            </label>
            <input
              className={styles.input}
              type="text"
              id="arabicName"
              name="arabicName"
              placeholder="الاسم العربي  "
              // Add an onChange handler to update the state when the input changes
              onChange={handleInputChange}
              defaultValue={initial.arabicName}
            />
          </div>
          <div>
            <div className={styles.userInputBox}>
              <label className={styles.label} htmlFor="name">
                الاسم الاجنبي
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                placeholder=" الاسم الاجنبي"
                // Add an onChange handler to update the state when the input changes
                onChange={handleInputChange}
                defaultValue={initial.name}
              />
            </div>{" "}
            <p>اختاري الصور</p>
            <input
              type="file"
              id="files"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              name="image"
            />
          </div>
        </div>

        <div className={styles.formSubmitBtn}>
          <button type="submit"> تأكيد</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategoryForm;
