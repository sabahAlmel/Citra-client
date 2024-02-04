import React,{useEffect, useState} from "react";
import styles from "./AddressForm.module.css";
import axios from "axios";
import {toast} from "react-toastify"

function AddressForm(props) {

  const {total, cartItems} = props

  const items = cartItems.map((item,index)=>(`${"  "}
  المنتج= ${item.arabicName}
  الكمية= ${item.quantity}
    السعر= ${item.totalPrice}
    اللون= ${item.selectedColor}
    الحجم= ${item.selectedSize}\n${"_______"}`))

const itemsID = cartItems.map((item,index)=>(item._id))

// const orderNumbers = async()=>{
//    try{
// const orders =await axios.get(`${process.env.REACT_APP_BACKEND}order/all`);
//     return orders.data;
//     console.log(orders.data)
//   }catch(err){
//     console.log(err)
//   }
// }

// useEffect(()=>{
//   orderNumbers();
// },[])

const [formData, setFormData] = useState({
  fullname:"",
  email:"",
  area:"",
  phoneNumber:"",
  building:"",
  ownername:"",
  shopsname:""
});
const handleChange = (e) => {
  let { name, value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const phone =96176153425;
const message = `الاسم: ${formData.fullname}\nالبريد: ${formData.email}\nرقم الهاتف: ${formData.phoneNumber}\nالبناية: ${formData.building}\nاسم صاحب المنزل: ${formData.ownername}\nبجوار: ${formData.shopsname}\n${"_______"},${items}`
const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

const handleSubmit = async(e)=>{
  e.preventDefault();
  console.log("hello");
  window.open(url , "_blank");
  // await axios
  // .post(`${process.env.REACT_APP_BACKEND}order/create`, {
  //   status:"pending",
  //   productID:itemsID,
  //   orderNB:"",
  // }, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // })
  // .then((res) => {
  //   toast.success("تمت اضافة الطلب بنجاح");
  // })
  // .catch((err) => {
  //   toast.error("حصل خطأ أثناء اضافة الطلب");
  //   console.log(err);
  // });
}



  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.formTitle}>استمارة طلبية</h1>
      <form method="POST">
        <div className={styles.mainUserInfo}>
          <div className={styles.userInputBox}>
            <label className={styles.label} for="fullname" >الاسم
            </label>
            <input
              className={styles.input}
              type="text"
              id="fullname"
              name="fullname"
              onChange={handleChange}
              placeholder="ادخل الاسم الكامل"
            />
          </div>
          {/* ... Other user input boxes */}
          <div className={styles.userInputBox}>
            <label for="email">البريد الالكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="ادخل البريد الالكتروني"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="area">المنطقة</label>
            <input
              type="text"
              id="area"
              name="area"
              onChange={handleChange}
              placeholder="ادخل المنطقة"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="phoneNumber">رقم الهاتف</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleChange}
              placeholder="ادخل رقم الهاتف"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="building">البناية و الطابق</label>
            <input
              type="text"
              id="building"
              name="building"
              onChange={handleChange}
              placeholder="ادخل اسم البناية و الطابق"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="ownername">اسم صاحب المنزل</label>
            <input
              type="text"
              id="ownername"
              name="ownername"
              onChange={handleChange}
              placeholder="ادخل الاسم هنا"
            />
          </div>
          <div className={styles.userInputBox}>
            <label for="shopesname">اسم محلين جانب مدخل البناية</label>
            <input
              type="text"
              id="shopesname"
              onChange={handleChange}
              name="shopsname"
              placeholder="ادخل اسماء المحلات"
            />
          </div>
        </div>

        <div className={styles.formSubmitBtn}>
     <button onClick={handleSubmit}>
      طلب ${total}
      </button> 

        </div>
      </form>
    </div>
      
    </>
  );
}

export default AddressForm;
