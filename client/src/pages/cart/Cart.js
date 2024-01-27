import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import CartCards from "../../components/cartCards/CartCards";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const nb = cartItems.length;
  const [total, setTotal] = useState(
    cartItems.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
  );

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0
    );
    setTotal(newTotal);
  }, [cartItems]);
  if (nb === 0) {
    return (
      <section className={style.wrapper}>
        <div className={style.description}>
          <h1 className={style.header}>سلة المشتريات</h1>
          <p className={style.nbOfProducts}>لديك 0 منتجات في السلة</p>
          <p className={style.startShopping}>ابدأ التسوق الآن!</p>
        </div>
      </section>
    );
  }

  return (
    <section className={style.wrapper}>
      <div className={style.description}>
        <h1 className={style.header}>سلة المشتريات</h1>
        <p className={style.nbOfProducts}>لديك {nb} منتجات في السلة</p>
      </div>
      <div className={style.displayCards}>
        {cartItems.map((item, index) => (
          <CartCards
            quantity={item.quantity}
            arabicName={item.arabicName}
            price={item.totalPrice}
            color={item.selectedColor}
            size={item.selectedSize}
            key={index}
            image={item.image}
            cartItems={setCartItems}
            slug={item.slug}
          />
        ))}
      </div>
      <Link to="" className={style.checkoutBTN}>
        <span className={style.checkout}> طلب الشراء</span>
        <span className={style.total}>{total} $</span>
      </Link>
    </section>
  );
}

export default Cart;
