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

function CartCards({ name, price, size, color }) {
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
  return (
    <section className={style.wrapper}>
      <div className={style.pic}>
        <p>{name}</p>
      </div>
      <div className={style.middle}>
        <p>{price}</p>
        <p>{color}</p>
      </div>

      <p>{size}</p>
      <p>{size} $</p>

      <aside className={style.left}>
        <Img />
      </aside>
    </section>
  );
}

export default CartCards;
