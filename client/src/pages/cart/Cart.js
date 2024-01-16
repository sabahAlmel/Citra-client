import React from "react";
import style from "./Cart.module.css";
import CartCards from "../../components/cartCards/CartCards";
import { Link } from "react-router-dom";

function Cart() {
  const products = [
    {
      name: "product 1",
      price: "200",
      color: "red",
      size: "large",
    },
    {
      name: "product 2",
      price: "300",
      color: "black",
      size: "medium",
    },
    {
      name: "product 3",
      price: "250",
      color: "yellow",
      size: "large",
    },
  ];
  let nb = products.length;
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += parseFloat(products[i].price);
  }
  return (
    <section className={style.wrapper}>
      <div className={style.description}>
        <h1 className={style.header}>سلة المشتريات</h1>
        <p className={style.nbOfProducts}>لديك {nb} منتجات في السلة</p>
      </div>
      <div className={style.displayCards}>
        {products.map((product, index) => {
          return (
            <CartCards
              name={product.name}
              price={product.price}
              color={product.color}
              size={product.size}
              key={index}
            />
          );
        })}
      </div>
      <Link to="" className={style.checkoutBTN}>
        <span className={style.checkout}> طلب الشراء</span>
        <span className={style.total}>{total} $</span>
      </Link>
    </section>
  );
}

export default Cart;
