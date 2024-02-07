import React, { useState, useEffect } from "react";
import styles from "./ProductForm.module.css";
import axios from "axios";

function ProductForm({
  formData,
  onInputChange,
  onSubmit,
  setFormData,
  category,
  subCategory,
}) {
  console.log("Rendering ProductForm with formData:", formData);
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    console.log("Selected SubCategory:", selectedSubCategory);
    setSelectedSubCategory(selectedSubCategory);
    setFormData((prevData) => ({
      ...prevData,
      subCategory: selectedSubCategory,
    }));

    console.log("Updated formData with subcategories after selection:", {
      ...formData,
      subCategory: selectedSubCategory,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
    console.log("submitted form as ", formData);
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category._id : ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    subCategory ? subCategory._id : ""
  );

  // Updated dependency array
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Selected Category:", selectedCategory);

    setSelectedCategory(selectedCategory);
    setFormData((prevData) => ({ ...prevData, category: selectedCategory }));

    console.log("Updated formData with category after selection:", {
      ...formData,
      category: selectedCategory,
    });
  };
  // const handleDetailsChange = (index, value) => {
  //   console.log("object");
  //   const updatedDetails = [...formData.details];
  //   updatedDetails[index] = value;
  //   console.log("Updated details:", updatedDetails); // Add this line
  //   // setFormData({ ...formData, details: updatedDetails });
  //   setFormData((prevData) => ({ ...prevData, details: updatedDetails }));

  //   // onInputChange({ ...formData, details: updatedDetails });
  // };
  const handleDetailsChange = (index, field, value) => {
    const updatedDetails = formData.details.map((detail, idx) => {
      if (idx === index) {
        return {
          ...detail,
          [field]: value,
        };
      }
      return detail;
    });

    setFormData((prevData) => ({
      ...prevData,
      details: updatedDetails,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}category/getall`
        );

        if (
          response.data.categories &&
          Array.isArray(response.data.categories)
        ) {
          setCategoryOptions(response.data.categories);
        } else {
          console.error(
            "Invalid response format for categories:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}subCategory/getall`
        );

        if (response.data.subCateg && Array.isArray(response.data.subCateg)) {
          setSubCategoryOptions(response.data.subCateg);
        } else {
          console.error(
            "Invalid response format for subcategories:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);
  const handleSizeChange = (detailIndex, sizeIndex, value) => {
    const updatedDetails = formData.details.map((detail, index) => {
      if (index === detailIndex) {
        const updatedSizes = detail.sizes.map((size, idx) => {
          if (idx === sizeIndex) {
            return {
              ...size,
              size: value,
            };
          }
          return size;
        });
        return {
          ...detail,
          sizes: updatedSizes,
        };
      }
      return detail;
    });
    setFormData((prevData) => ({
      ...prevData,
      details: updatedDetails,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}> تعديل المعلومات الشخصية</h1>
      <form onSubmit={onSubmit}>
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
              value={formData.arabicName}
              // Add an onChange handler to update the state when the input changes
              onChange={onInputChange}
            />
          </div>

          {/* ... Other user input boxes */}
          <div className={styles.userInputBox}>
            <label for="price"> السعر</label>
            <input
              type="price"
              id="price"
              name="price"
              placeholder="السعر "
              onChange={onInputChange}
              value={formData.price}
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="serialNumber">رقم التسلسلي</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              placeholder="  الرقم التسلسلي"
              onChange={onInputChange}
              value={formData.serialNumber}
            />
          </div>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="categoryID">
              الفئة
            </label>
            <div>
              <select
                className={styles.select}
                id="categoryID"
                name="categoryID"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  اختر الفئة
                </option>
                {categoryOptions.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.arabicName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="subCategoryID">
              الفئة الفرعية
            </label>
            <div>
              <select
                className={styles.select}
                id="subCategoryID"
                name="subCategoryID"
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
              >
                <option value="" disabled>
                  اختر الفئة الفرعية
                </option>
                {subCategoryOptions.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.arabicName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="description">
              الوصف
            </label>
            <textarea
              className={styles.textarea}
              id="description"
              name="description"
              placeholder="الوصف"
              value={formData.description}
              onChange={onInputChange}
            />
          </div>

          <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="details">
              التفاصيل
            </label>
            {formData.details.map((detail, index) => (
              <div key={index}>
                <label className={styles.label} htmlFor={`color_${index}`}>
                  لون {index + 1}
                </label>
                <input
                  className={styles.input}
                  type="color"
                  id={`color_${index}`}
                  name={`color_${index}`}
                  placeholder={`لون ${index + 1}`}
                  value={detail.color}
                  onChange={(e) =>
                    handleDetailsChange(index, "color", e.target.value)
                  }
                />
                {detail.sizes &&
                  detail.sizes.map((size, sizeIndex) => (
                    <div key={`${index}_${sizeIndex}`}>
                      <label
                        className={styles.label}
                        htmlFor={`size_${index}_${sizeIndex}`}
                      >
                        حجم {sizeIndex + 1}
                      </label>
                      {/* Render input field for size */}
                      <input
                        className={styles.input}
                        type="text"
                        id={`size_${index}_${sizeIndex}`}
                        name={`size_${index}_${sizeIndex}`}
                        placeholder={`حجم ${sizeIndex + 1}`}
                        value={size.size || ""}
                        onChange={(e) =>
                          handleSizeChange(index, sizeIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSubmitBtn}>
          <button type="submit"> طلب</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
