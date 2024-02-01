import React, { useState, useEffect } from "react";
import style from "./orderReview.module.css";
import hijaba2 from "../../assets/images/hijabi2.jpg";
function OrderReview() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const orderItems = JSON.parse(localStorage.getItem("cart")) || [];
    setOrder(orderItems);
  }, []);

  const nb = order.length;
  const [totalPrice, setTotalPrice] = useState(
    order.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
  );

  useEffect(() => {
    const newTotal = order.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0
    );
    setTotalPrice(newTotal);
  }, [order]);

  return (
    <section className={style.all}>
      <section className={style.wrapper}>
        {order.map((product, index) => {
          return (
            <div key={index} className={style.orders}>
              <div className={style.container}>
                <img
                  src={
                    product.image
                      ? `${process.env.REACT_APP_BACKEND}${product.image}`
                      : hijaba2
                  }
                  alt="overview"
                  height="70%"
                  width="100%"
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
                        الكمية : {product.quantity}
                      </p>
                      <p className={style.details}>
                        الوصف : {product.selectedSize}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <div className={style.total}>
        <p className={style.totalprice}>
          <span className={style.pricetxt}>المجموع:</span>
          <span className={style.pricenb}>{totalPrice} $</span>
        </p>
      </div>
    </section>
  );
}

export default OrderReview;
