import React from "react";
import styles from "./ProductForm.module.css";

function ProductForm({ formData, onInputChange, onSubmit, setFormData }) {
  console.log("Rendering ProductForm with formData:", formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function and pass the formData to it
    onSubmit(formData);
  };

  const handleDetailsChange = (index, field, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index][field] = value;
    onInputChange({ ...formData, details: updatedDetails });
  };
  const handleImageClick = (index) => {
    // Handle clicking on an image, e.g., navigate to a specific index
    console.log(`Clicked on image at index ${index}`);
    // You can implement navigation or any other logic here
  };
  
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
  
    if (file) {
      const updatedImages = [...formData.images];
  
      // Check if the current item is a file object or a string (URL)
      if (file instanceof File) {
        updatedImages[index] = file;
      } else {
        // Replace the existing URL with the new file object
        updatedImages[index] = file;
      }
  
      setFormData((prevFormData) => ({ ...prevFormData, images: updatedImages }));
    }
  };
  const handleImageDelete = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevFormData) => ({ ...prevFormData, images: updatedImages }));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}> تعديل المعلومات الشخصية</h1>
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
            <label className={styles.label} htmlFor="images">
              الصور
            </label>
            {console.log(Array.isArray(formData.images))}
            {console.log("formData: ", formData)}
            {Array.isArray(formData.images) &&
              formData.images.map((imageData, index) => (
                <div key={index}>
                  <label>
                  <img
          src={
            typeof imageData === "string"
              ? process.env.REACT_APP_BACKEND + imageData
              : URL.createObjectURL(imageData)
          }
          alt={`Image ${index + 1}`}
          style={{
            maxWidth: "100px",
            maxHeight: "100px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={() => handleImageClick(index)}
        />
                    <input
                      type="file"
                      accept="image"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload(e, index)}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}

                  >
                    حذف
                  </button>
                </div>
              ))}
          {/* <div className={styles.userInputBox}>
            <label className={styles.label} htmlFor="newImages">
              إضافة صور جديدة
            </label>
            <input
              className={styles.input}
              id="newImages"
              name="newImages"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const newImages = [...formData.newImages];

                for (let i = 0; i < e.target.files.length; i++) {
                  const file = e.target.files[i];
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    newImages.push(reader.result);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      newImages: newImages,
                    }));
                  };

                  if (file) {
                    reader.readAsDataURL(file);
                  }
                }

                // Move the logging here after the loop
                console.log("Selected new files:", e.target.files);
                console.log("Updated formData:", {
                  ...formData,
                  newImages: newImages,
                });
              }}
            />
          </div> */}
      

       

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
                  type="text"
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
                      <input
                        className={styles.input}
                        type="text"
                        id={`size_${index}_${sizeIndex}`}
                        name={`size_${index}_${sizeIndex}`}
                        placeholder={`حجم ${sizeIndex + 1}`}
                        value={size.size || ""}
                        onChange={(e) =>
                          handleDetailsChange(
                            index,
                            `sizes.${sizeIndex}.size`,
                            e.target.value
                          )
                        }
                      />

                      <label
                        className={styles.label}
                        htmlFor={`quantity_${index}_${sizeIndex}`}
                      >
                        الكمية
                      </label>
                      <input
                        className={styles.input}
                        type="number"
                        id={`quantity_${index}_${sizeIndex}`}
                        name={`quantity_${index}_${sizeIndex}`}
                        placeholder="الكمية"
                        value={size.quantity}
                        onChange={(e) =>
                          handleDetailsChange(
                            index,
                            `sizes.${sizeIndex}.quantity`,
                            e.target.value
                          )
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
