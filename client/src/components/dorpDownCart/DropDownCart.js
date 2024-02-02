import React, { useEffect, useRef, useState } from "react";
import style from "./DropDownCart.module.css";
import { Link } from "react-router-dom";
import trashCan from "../../assets/icons/blueTrashCan.svg";
import redTrashCan from "../../assets/icons/redTrashCan.svg";
import { toast } from "react-toastify";
import hijaba2 from "../../assets/images/hijabi2.jpg";

function Img({ onClick }) {
  const [hover, setHover] = useState(false);
  const hoverHandler = () => {
    setHover(!hover);
  };
  let trash = trashCan;
  if (hover) {
    trash = redTrashCan;
  } else {
    trash = trashCan;
  }
  return (
    <img
      src={trash}
      alt="trashcan"
      onMouseOver={hoverHandler}
      onMouseOut={hoverHandler}
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    />
  );
}
function DropDownCart({ setShopping }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const nb = cartItems.length;
  const [totalPrice, setTotalPrice] = useState(
    cartItems.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
  );

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0
    );
    setTotalPrice(newTotal);
  }, [cartItems]);

  const ref = useRef();

  const check = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShopping(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", check);
    return () => document.removeEventListener("mousedown", check);
  });

  const handleDelete = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex(
      (item) =>
        item.arabicName === product.arabicName &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize &&
        item.slug === product.slug
    );

    if (itemIndex !== -1) {
      existingCart.splice(itemIndex, 1);

      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCartItems(existingCart);
      toast.success("تم المحو بنجاح");
      return;
    }
    toast.error("حصل خطأ جرب مجددا");
  };

  //////////
  return (
    <div className={style.wrapper} ref={ref}>
      <div className={style.header}>
        <h1 className={style.title}>سلة المشتريات {`(${nb})`}</h1>
        <p className={style.x} onClick={() => setShopping(false)}>
          X
        </p>
      </div>
      <section className={style.orders}>
        {cartItems.map((product, index) => {
          return (
            <div key={index} className={style.miniCart}>
              <div className={style.container}>
                <img
                  src={
                    product.image
                      ? `${process.env.REACT_APP_BACKEND}${product.image}`
                      : hijaba2
                  }
                  alt="overview"
                  height="120px"
                  width="100px"
                  className={style.productPic}
                />
                <div className={style.left}>
                  <div className={style.upper}>
                    <p className={style.main}>{product.arabicName}</p>
                    <p className={style.main}>{product.totalPrice} $</p>
                  </div>
                  <div className={style.lower}>
                    <div className={style.lowerRight}>
                      <p className={style.details}>
                        اللون : {product.selectedColor}
                      </p>
                      <p className={style.details}>
                        اللون : {product.selectedColor}
                      </p>
                      <p className={style.details}>
                        الكمية : {product.quantity}
                      </p>
                    </div>
                    <Img onClick={() => handleDelete(product)} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <section className={style.total}>
        <p className={style.totalprice}>
          <span>المجموع</span>
          <span>{totalPrice} $</span>
        </p>
        <Link to="/cart" className={style.gotocheckout}>
        طلب الشراء
        </Link>
      </section>
    </div>
  );
}

export default DropDownCart;
