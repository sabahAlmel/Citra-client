import React, { useState } from "react";
import style from "./DropDownCart.module.css";
import { Link } from "react-router-dom";
import overview from "../../assets/images/overview.jpeg";
import trashCan from "../../assets/icons/blueTrashCan.svg";
import redTrashCan from "../../assets/icons/redTrashCan.svg";

function Img() {
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
      style={{
        cursor: "pointer",
      }}
    />
  );
}
function DropDownCart({ setShopping }) {
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
  let totalPrice = 0;
  products.forEach((i) => (totalPrice += parseFloat(i.price)));
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h1 className={style.title}>سلة المشتريات {`(${nb})`}</h1>
        <p className={style.x} onClick={() => setShopping(false)}>
          X
        </p>
      </div>
      <section className={style.orders}>
        {products.map((product, index) => {
          return (
            <div
              className={style.miniCart}
              name={products.name}
              price={products.price}
              color={products.color}
              size={products.size}
            >
              <div className={style.container}>
                <img
                  src={overview}
                  alt="overview"
                  height="120px"
                  width="100px"
                  className={style.productPic}
                />
                <div className={style.left}>
                  <div className={style.upper}>
                    <p className={style.main}>{product.name}</p>
                    <p className={style.main}>{product.price} $</p>
                  </div>
                  <div className={style.lower}>
                    <div className={style.lowerRight}>
                      <p className={style.details}>اللون : {product.color}</p>
                      <p className={style.details}>الوصف : {product.size}</p>
                    </div>
                    <Img />
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
        <Link to="/cart" className={style.gotocart}>
          الذهاب الى السلة
        </Link>
        <Link to="" className={style.gotocheckout}>
          طلب الشراء
        </Link>
      </section>
    </div>
  );
}

export default DropDownCart;
