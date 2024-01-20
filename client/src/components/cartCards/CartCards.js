import React, { useState } from "react";
import style from "./CartCards.module.css";
import trashCan from "../../assets/icons/TrashCan.svg";
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

function CartCards() {
  const [hover, setHovered] = useState(false);
  const hoverHandler = () => {
    setHovered(!hover);
  };
  let trash = trashCan;
  if (hover) {
    trash = redTrashCan;
  } else {
    trash = trashCan;
  }
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
  return (
    <>
      {products.map((product, index) => {
        return (
          <section className={style.wrapper}>
            <div className={style.pic}>
              <p>{product.name}</p>
            </div>
            <div className={style.middle}>
              <p>{product.price}</p>
              <p>{product.color}</p>
            </div>

            <p>{product.size}</p>
            <p>{product.size} $</p>

            <aside className={style.left}>
              <Img />
            </aside>
          </section>
        );
      })}
    </>
  );
}

export default CartCards;
